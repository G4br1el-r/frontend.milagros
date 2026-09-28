import { createApiClient } from "@/lib/api-client";
import { MS_PER_SECOND, SECONDS_PER_MINUTE } from "@/lib/time/time.constants";
import { requireEnv } from "@/lib/utils/require-env";
import {
  AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
  AUTH_LOGIN_PATH,
} from "./constants";
import type { LoginRequest, LoginResponse } from "./types";

const authClient = createApiClient({
  baseUrl: requireEnv("API_URL"),
});
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
        session.expiraEmMinutos * SECONDS_PER_MINUTE -
          AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
        AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
      ) *
        MS_PER_SECOND,
  };
  return session;
}
async function login(): Promise<LoginResponse> {
  const payload: LoginRequest = {
    usuario: requireEnv("CATALOG_API_USER"),
    senha: requireEnv("CATALOG_API_PASSWORD"),
  };
  return authClient.post<LoginResponse>(AUTH_LOGIN_PATH, payload);
}
export async function getValidToken(): Promise<string> {
  return (await loadSession()).accessToken;
}
export async function getPriceTableCode(): Promise<string> {
  return (await loadSession()).codigoTabelaPreco;
}
export async function invalidateToken(): Promise<void> {
  cachedSession = null;
}
