import { beforeEach, describe, expect, it, vi } from "vitest";
import { makePedido } from "@/test/fixtures";
import { CheckoutApiError, fetchOrdersByDocument } from "./checkout.client";

const fetchMock = vi.fn<typeof fetch>();

describe("fetchOrdersByDocument", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("busca pelo documento sem mascara e ordena do mais recente", async () => {
    const pedidos = [
      makePedido({ id: "antigo", dataPedido: "2025-01-10T10:00:00.000Z" }),
      makePedido({ id: "recente", dataPedido: "2026-03-01T10:00:00.000Z" }),
      makePedido({ id: "meio", dataPedido: "2025-08-15T10:00:00.000Z" }),
    ];
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(pedidos), { status: 200 }),
    );
    const result = await fetchOrdersByDocument("529.982.247-25");
    expect(fetchMock).toHaveBeenCalledWith("/api/pedidos/cpf/52998224725");
    expect(result.map((pedido) => pedido.id)).toEqual([
      "recente",
      "meio",
      "antigo",
    ]);
  });

  it("lanca CheckoutApiError com mensagem da API", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ mensagem: "Cliente sem pedidos" }), {
        status: 404,
      }),
    );
    const promise = fetchOrdersByDocument("52998224725");
    await expect(promise).rejects.toBeInstanceOf(CheckoutApiError);
    await expect(promise).rejects.toMatchObject({
      status: 404,
      message: "Cliente sem pedidos",
    });
  });

  it("usa mensagem padrao quando a API nao informa", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));
    await expect(fetchOrdersByDocument("52998224725")).rejects.toMatchObject({
      status: 500,
      message: "Falha no checkout (HTTP 500)",
    });
  });
});
