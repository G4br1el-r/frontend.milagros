import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  BadRequestError,
  InternalError,
  UpstreamError,
} from "@/lib/api-client";
import { buildCheckoutRequest } from "@/lib/checkout/checkout.mapper";
import type { CheckoutResponse } from "@/lib/checkout/checkout.types";
import { makeCartItem, VALID_CPF } from "@/test/fixtures";
import { POST } from "./route";

const { postMock } = vi.hoisted(() => ({ postMock: vi.fn() }));

vi.mock("@/lib/api", () => ({ api: { post: postMock } }));

vi.mock("@/lib/api/with-auth-retry", () => ({
  withAuthRetry: <T>(request: () => Promise<T>) => request(),
}));

const ROUTE_URL = "http://localhost/api/checkout";
const GENERIC_ERROR_MESSAGE = "Erro inesperado ao consumir a API";

function postRequest(body: string): NextRequest {
  return new NextRequest(ROUTE_URL, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
}

function buildPayload() {
  return buildCheckoutRequest([makeCartItem({ quantity: 2 })], VALID_CPF);
}

function buildCheckoutResponse(
  overrides: Partial<CheckoutResponse> = {},
): CheckoutResponse {
  return {
    valido: true,
    mensagem: null,
    primeiraCompra: false,
    tipoClienteDetectado: "Varejo",
    valorMinimoAplicado: 0,
    totalPedido: 20,
    formasPagamento: [],
    ...overrides,
  };
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  it("repassa o payload validado e retorna o resultado", async () => {
    const payload = buildPayload();
    const resultado = buildCheckoutResponse();
    postMock.mockResolvedValue(resultado);
    const response = await POST(postRequest(JSON.stringify(payload)));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(resultado);
    expect(postMock).toHaveBeenCalledWith("/api/checkout", payload);
  });

  it("retorna 400 para body que nao e JSON", async () => {
    const response = await POST(postRequest("{invalido"));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Requisição inválida",
      code: "BAD_REQUEST",
    });
    expect(postMock).not.toHaveBeenCalled();
  });

  it("retorna 400 para payload fora do schema", async () => {
    const response = await POST(
      postRequest(JSON.stringify({ ...buildPayload(), extra: true })),
    );
    expect(response.status).toBe(400);
    expect(postMock).not.toHaveBeenCalled();
  });

  it("retorna a rejeicao de negocio como resposta de sucesso", async () => {
    const rejeicao = buildCheckoutResponse({
      valido: false,
      mensagem: "Pedido abaixo do valor minimo",
    });
    postMock.mockRejectedValue(
      new BadRequestError("Pedido invalido", { details: rejeicao }),
    );
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(rejeicao);
  });

  it("retorna o erro 400 quando nao e rejeicao de negocio", async () => {
    postMock.mockRejectedValue(
      new BadRequestError("Pedido invalido", { details: { campo: "x" } }),
    );
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Pedido invalido",
      code: "BAD_REQUEST",
    });
  });

  it("retorna resposta generica para 5xx sem vazar details", async () => {
    postMock.mockRejectedValue(
      new UpstreamError(502, "stack interna", { details: { segredo: "x" } }),
    );
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      message: GENERIC_ERROR_MESSAGE,
      code: "UPSTREAM_ERROR",
    });
  });

  it("retorna 500 generico para erro interno", async () => {
    postMock.mockRejectedValue(new InternalError("detalhe interno"));
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      message: GENERIC_ERROR_MESSAGE,
      code: "INTERNAL_ERROR",
    });
  });
});
