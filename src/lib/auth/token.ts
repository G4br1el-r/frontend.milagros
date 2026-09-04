import { cookies } from "next/headers";
import { createApiClient } from "@/lib/api-client";
import { requireEnv } from "@/lib/utils/require-env";
import {
  AUTH_COOKIE_NAME,
  AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
  AUTH_LOGIN_PATH,
  AUTH_PRICE_TABLE_COOKIE_NAME,
} from "./constants";
import type { LoginRequest, LoginResponse } from "./types";

const authClient = createApiClient({
  baseUrl: requireEnv("API_URL"),
});

/**
 * Cache de processo da sessao. O cookie continua sendo o cache primario
 * (sobrevive a restart e e por navegador), mas ele so pode ser GRAVADO em
 * route handler. Sem este cache, todo render de Server Component sem cookie
 * dispararia um POST /api/auth/login novo. Guarda o instante de expiracao
 * para nao servir token vencido.
 */
let cachedSession: { session: LoginResponse; expiresAt: number } | null = null;

function readCachedSession(): LoginResponse | null {
  if (!cachedSession) return null;
  if (Date.now() >= cachedSession.expiresAt) {
    cachedSession = null;
    return null;
  }
  return cachedSession.session;
}

async function loadSession(): Promise<LoginResponse> {
  const cached = readCachedSession();
  if (cached) return cached;

  const session = await login();
  cachedSession = {
    session,
    expiresAt:
      Date.now() +
      Math.max(
        session.expiraEmMinutos * 60 - AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
        AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
      ) *
        1000,
  };

  await persistSession(session);
  return session;
}

async function login(): Promise<LoginResponse> {
  const payload: LoginRequest = {
    usuario: requireEnv("CATALOG_API_USER"),
    senha: requireEnv("CATALOG_API_PASSWORD"),
  };

  return authClient.post<LoginResponse>(AUTH_LOGIN_PATH, payload);
}

/**
 * O cache do token so pode ser gravado em Server Action ou Route Handler —
 * um Server Component que tenta escrever cookie estoura ("Cookies can only
 * be modified in a Server Action or Route Handler"). Como `getValidToken` e
 * chamado dos dois lados (route handlers de /api/* E Server Components de
 * pagina), a gravacao e best-effort: se o contexto nao permitir, a sessao
 * segue valida em memoria para esta requisicao e o cookie e gravado na
 * proxima chamada que vier de um route handler.
 */
async function persistSession(session: LoginResponse) {
  const maxAge = Math.max(
    session.expiraEmMinutos * 60 - AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
    AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
  );

  const baseCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };

  try {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, session.accessToken, baseCookieOptions);
    cookieStore.set(
      AUTH_PRICE_TABLE_COOKIE_NAME,
      session.codigoTabelaPreco,
      baseCookieOptions,
    );
  } catch {
    // Contexto somente-leitura (Server Component): nada a fazer.
  }
}

export async function getValidToken(): Promise<string> {
  const cookieStore = await cookies();
  const cached = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (cached) {
    return cached;
  }

  return (await loadSession()).accessToken;
}

export async function getPriceTableCode(): Promise<string> {
  const cookieStore = await cookies();
  const cached = cookieStore.get(AUTH_PRICE_TABLE_COOKIE_NAME)?.value;

  if (cached) {
    return cached;
  }

  return (await loadSession()).codigoTabelaPreco;
}

export async function invalidateToken(): Promise<void> {
  // Mesma restricao de contexto de `persistSession`. Alem disso, limpar o
  // cache em memoria e o que de fato forca o proximo login — sem isso o
  // retry de 401 reusaria o token invalido.
  cachedSession = null;

  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    cookieStore.delete(AUTH_PRICE_TABLE_COOKIE_NAME);
  } catch {
    // Contexto somente-leitura (Server Component): nada a fazer.
  }
}
