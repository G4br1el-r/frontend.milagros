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

async function login(): Promise<LoginResponse> {
  const payload: LoginRequest = {
    usuario: requireEnv("CATALOG_API_USER"),
    senha: requireEnv("CATALOG_API_PASSWORD"),
  };

  return authClient.post<LoginResponse>(AUTH_LOGIN_PATH, payload);
}

async function persistSession(session: LoginResponse) {
  const cookieStore = await cookies();
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

  cookieStore.set(AUTH_COOKIE_NAME, session.accessToken, baseCookieOptions);
  cookieStore.set(
    AUTH_PRICE_TABLE_COOKIE_NAME,
    session.codigoTabelaPreco,
    baseCookieOptions,
  );
}

export async function getValidToken(): Promise<string> {
  const cookieStore = await cookies();
  const cached = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (cached) {
    return cached;
  }

  const session = await login();
  await persistSession(session);

  return session.accessToken;
}

export async function getPriceTableCode(): Promise<string> {
  const cookieStore = await cookies();
  const cached = cookieStore.get(AUTH_PRICE_TABLE_COOKIE_NAME)?.value;

  if (cached) {
    return cached;
  }

  const session = await login();
  await persistSession(session);

  return session.codigoTabelaPreco;
}

export async function invalidateToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete(AUTH_PRICE_TABLE_COOKIE_NAME);
}
