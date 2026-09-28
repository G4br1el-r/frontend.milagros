import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BadRequestError, UpstreamError } from "@/lib/api-client";
import { buildFinalizeRequest } from "@/lib/checkout/checkout.mapper";
import type { FinalizarCheckoutResponse } from "@/lib/checkout/checkout.types";
import {
  makeCartItem,
  makeCustomer,
  makeFormaPagamento,
  makeParcela,
} from "@/test/fixtures";
import { POST } from "./route";

const { postMock } = vi.hoisted(() => ({ postMock: vi.fn() }));

vi.mock("@/lib/api", () => ({ api: { post: postMock } }));

vi.mock("@/lib/api/with-auth-retry", () => ({
  withAuthRetry: <T>(request: () => Promise<T>) => request(),
}));

const ROUTE_URL = "http://localhost/api/checkout/finalizar";
const LOG_MESSAGE = "[POST /api/checkout/finalizar] falha no upstream";
const GENERIC_ERROR_MESSAGE = "Erro inesperado ao consumir a API";

function postRequest(body: string): NextRequest {
  return new NextRequest(ROUTE_URL, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
}

function buildPayload() {
  const parcela = makeParcela();
  return buildFinalizeRequest({
    customer: makeCustomer(),
    items: [makeCartItem({ quantity: 2 })],
    forma: makeFormaPagamento({ opcoesParcelamento: [parcela] }),
    parcela,
    tipoCliente: "Varejo",
    observacoes: "",
  });
}

function buildFinalizeResponse(
  overrides: Partial<FinalizarCheckoutResponse> = {},
): FinalizarCheckoutResponse {
  return {
    sucesso: true,
    mensagem: null,
    pedidoId: "pedido-1",
    numeroPedido: "1001",
    codigoPedidoIntegracao: null,
    numeroPedidoOmie: "1001",
    valorTotal: 20,
    pdfUrl: null,
    whatsappUrl: null,
    pedido: null,
    ...overrides,
  };
}

describe("POST /api/checkout/finalizar", () => {
  beforeEach(() => {
    postMock.mockReset();
  });

  it("repassa o payload validado e retorna o resultado", async () => {
    const payload = buildPayload();
    const resultado = buildFinalizeResponse();
    postMock.mockResolvedValue(resultado);
    const response = await POST(postRequest(JSON.stringify(payload)));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(resultado);
    expect(postMock).toHaveBeenCalledWith("/api/checkout/finalizar", payload);
  });

  it("retorna 400 para body invalido sem chamar a API", async () => {
    const response = await POST(
      postRequest(JSON.stringify({ ...buildPayload(), itens: [] })),
    );
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Requisição inválida",
      code: "BAD_REQUEST",
    });
    expect(postMock).not.toHaveBeenCalled();
  });

  it("retorna a rejeicao de negocio sem registrar log", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const rejeicao = buildFinalizeResponse({
      sucesso: false,
      mensagem: "Forma de pagamento indisponivel",
      pedidoId: null,
    });
    postMock.mockRejectedValue(
      new BadRequestError("Pedido invalido", { details: rejeicao }),
    );
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(rejeicao);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("retorna resposta generica para 5xx e registra log sem details", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    postMock.mockRejectedValue(
      new UpstreamError(502, "stack interna", { details: { segredo: "x" } }),
    );
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      message: GENERIC_ERROR_MESSAGE,
      code: "UPSTREAM_ERROR",
    });
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith(LOG_MESSAGE, {
      status: 502,
      code: "UPSTREAM_ERROR",
    });
  });

  it("nao registra log para erro 4xx", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    postMock.mockRejectedValue(new BadRequestError("Pedido invalido"));
    const response = await POST(postRequest(JSON.stringify(buildPayload())));
    expect(response.status).toBe(400);
    expect(consoleError).not.toHaveBeenCalled();
  });
});
