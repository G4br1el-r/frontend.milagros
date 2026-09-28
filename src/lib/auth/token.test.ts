import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MS_PER_SECOND, SECONDS_PER_MINUTE } from "@/lib/time/time.constants";
import {
  AUTH_EXPIRY_SAFETY_MARGIN_SECONDS,
  AUTH_LOGIN_PATH,
} from "./constants";
import type { LoginResponse } from "./types";

const { postMock } = vi.hoisted(() => ({ postMock: vi.fn() }));

vi.mock("@/lib/api-client", () => ({
  createApiClient: () => ({ post: postMock }),
}));

vi.mock("@/lib/utils/require-env", () => ({
  requireEnv: (name: string) => `env:${name}`,
}));

type TokenModule = typeof import("./token");

const SESSION_MINUTES = 30;

function makeSession(overrides: Partial<LoginResponse> = {}): LoginResponse {
  return {
    accessToken: "token-1",
    tokenType: "Bearer",
    expiraEmMinutos: SESSION_MINUTES,
    codigoTabelaPreco: "TABELA-1",
    nomeTabelaPreco: "Tabela padrao",
    ...overrides,
  };
}

async function loadTokenModule(): Promise<TokenModule> {
  vi.resetModules();
  return import("./token");
}

describe("token", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00.000Z"));
    postMock.mockReset();
    postMock.mockResolvedValue(makeSession());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("faz login com as credenciais do ambiente", async () => {
    const { getValidToken } = await loadTokenModule();
    await expect(getValidToken()).resolves.toBe("token-1");
    expect(postMock).toHaveBeenCalledWith(AUTH_LOGIN_PATH, {
      usuario: "env:CATALOG_API_USER",
      senha: "env:CATALOG_API_PASSWORD",
    });
  });

  it("reusa a sessao em cache enquanto valida", async () => {
    const { getValidToken, getPriceTableCode } = await loadTokenModule();
    await getValidToken();
    await getValidToken();
    await expect(getPriceTableCode()).resolves.toBe("TABELA-1");
    expect(postMock).toHaveBeenCalledTimes(1);
  });

  it("aplica a margem de seguranca na expiracao", async () => {
    const { getValidToken } = await loadTokenModule();
    const ttlMs =
      (SESSION_MINUTES * SECONDS_PER_MINUTE -
        AUTH_EXPIRY_SAFETY_MARGIN_SECONDS) *
      MS_PER_SECOND;
    await getValidToken();
    vi.advanceTimersByTime(ttlMs - 1);
    await getValidToken();
    expect(postMock).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    await getValidToken();
    expect(postMock).toHaveBeenCalledTimes(2);
  });

  it("usa a margem minima quando a sessao expira antes dela", async () => {
    postMock.mockResolvedValue(makeSession({ expiraEmMinutos: 0 }));
    const { getValidToken } = await loadTokenModule();
    const minimumTtlMs = AUTH_EXPIRY_SAFETY_MARGIN_SECONDS * MS_PER_SECOND;
    await getValidToken();
    vi.advanceTimersByTime(minimumTtlMs - 1);
    await getValidToken();
    expect(postMock).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    await getValidToken();
    expect(postMock).toHaveBeenCalledTimes(2);
  });

  it("le token e tabela de preco da mesma sessao", async () => {
    postMock.mockResolvedValue(
      makeSession({ accessToken: "abc", codigoTabelaPreco: "TP-9" }),
    );
    const { getValidToken, getPriceTableCode } = await loadTokenModule();
    await expect(getPriceTableCode()).resolves.toBe("TP-9");
    await expect(getValidToken()).resolves.toBe("abc");
    expect(postMock).toHaveBeenCalledTimes(1);
  });

  it("invalidateToken forca novo login", async () => {
    postMock
      .mockResolvedValueOnce(makeSession({ accessToken: "token-1" }))
      .mockResolvedValueOnce(makeSession({ accessToken: "token-2" }));
    const { getValidToken, invalidateToken } = await loadTokenModule();
    await expect(getValidToken()).resolves.toBe("token-1");
    await invalidateToken();
    await expect(getValidToken()).resolves.toBe("token-2");
    expect(postMock).toHaveBeenCalledTimes(2);
  });

  it("nao guarda sessao quando o login falha", async () => {
    postMock
      .mockRejectedValueOnce(new Error("falha no login"))
      .mockResolvedValueOnce(makeSession({ accessToken: "token-2" }));
    const { getValidToken } = await loadTokenModule();
    await expect(getValidToken()).rejects.toThrow("falha no login");
    await expect(getValidToken()).resolves.toBe("token-2");
  });
});
