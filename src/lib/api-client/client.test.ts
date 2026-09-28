import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApiClient } from "./client";
import {
  AppError,
  NetworkError,
  NotFoundError,
  TimeoutError,
  UpstreamError,
} from "./errors";

const BASE_URL = "https://api.example.com";
const SHORT_TIMEOUT_MS = 5;

const fetchMock = vi.fn<typeof fetch>();

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function captureError(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("A requisicao deveria ter falhado");
}

describe("createApiClient", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("retorna o corpo JSON em caso de sucesso", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ id: 1 }, 200));
    const client = createApiClient({ baseUrl: BASE_URL });
    await expect(client.get("/produtos")).resolves.toEqual({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/produtos`,
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("envia body JSON e token de autorizacao", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }, 200));
    const client = createApiClient({
      baseUrl: BASE_URL,
      getToken: async () => "abc",
    });
    await client.post("/pedidos", { total: 10 });
    const init = fetchMock.mock.calls[0]?.[1];
    expect(init?.method).toBe("POST");
    expect(init?.body).toBe(JSON.stringify({ total: 10 }));
    expect(init?.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer abc",
    });
  });

  it("converte erro JSON com message em AppError", async () => {
    const body = { message: "Produto nao encontrado" };
    fetchMock.mockResolvedValue(jsonResponse(body, 404));
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos/x"));
    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(NotFoundError);
    expect(error).toMatchObject({
      message: "Produto nao encontrado",
      statusCode: 404,
      details: body,
    });
  });

  it("prioriza a mensagem aninhada em error.message", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ message: "externa", error: { message: "interna" } }, 404),
    );
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos/x"));
    expect(error).toMatchObject({ message: "interna" });
  });

  it("usa fallback HTTP status quando o erro vem em HTML", async () => {
    fetchMock.mockResolvedValue(
      new Response("<html><body>Bad Gateway</body></html>", { status: 502 }),
    );
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos"));
    expect(error).toBeInstanceOf(UpstreamError);
    expect(error).toMatchObject({ message: "HTTP 502", statusCode: 502 });
  });

  it("usa texto curto do corpo como mensagem", async () => {
    fetchMock.mockResolvedValue(
      new Response("  Servico indisponivel  ", { status: 503 }),
    );
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos"));
    expect(error).toMatchObject({
      message: "Servico indisponivel",
      statusCode: 503,
    });
  });

  it("usa fallback HTTP status quando o corpo de erro e vazio", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos"));
    expect(error).toMatchObject({ message: "HTTP 500", statusCode: 500 });
  });

  it("retorna undefined para 204", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
    const client = createApiClient({ baseUrl: BASE_URL });
    await expect(client.delete("/pedidos/1")).resolves.toBeUndefined();
  });

  it("lanca TimeoutError quando a requisicao excede o tempo limite", async () => {
    fetchMock.mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(init?.signal?.reason),
          );
        }),
    );
    const client = createApiClient({
      baseUrl: BASE_URL,
      timeoutMs: SHORT_TIMEOUT_MS,
    });
    await expect(client.get("/lento")).rejects.toBeInstanceOf(TimeoutError);
  });

  it("lanca NetworkError quando o fetch e rejeitado", async () => {
    const cause = new TypeError("fetch failed");
    fetchMock.mockRejectedValue(cause);
    const client = createApiClient({ baseUrl: BASE_URL });
    const error = await captureError(client.get("/produtos"));
    expect(error).toBeInstanceOf(NetworkError);
    expect(error).toMatchObject({ statusCode: 0, cause });
  });
});
