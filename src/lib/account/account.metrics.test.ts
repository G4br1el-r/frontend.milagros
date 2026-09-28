import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { makePedido, makePedidoItem, makePedidoParcela } from "@/test/fixtures";
import { computeAccountMetrics } from "./account.metrics";

const NOW = "2026-06-15T12:00:00.000Z";

describe("computeAccountMetrics", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna metricas zeradas sem pedidos", () => {
    expect(computeAccountMetrics([])).toEqual({
      totalPedidos: 0,
      totalGasto: 0,
      ticketMedio: 0,
      totalItens: 0,
      clienteDesde: null,
      proximaParcela: null,
    });
  });

  it("ignora pedidos cancelados sem diferenciar maiusculas e espacos", () => {
    const metrics = computeAccountMetrics([
      makePedido({ id: "a", status: "Faturado", valorTotal: 100 }),
      makePedido({ id: "b", status: "CANCELADO", valorTotal: 500 }),
      makePedido({ id: "c", status: " cancelada ", valorTotal: 700 }),
      makePedido({ id: "d", status: null, valorTotal: 50 }),
    ]);
    expect(metrics.totalPedidos).toBe(2);
    expect(metrics.totalGasto).toBe(150);
  });

  it("calcula ticket medio dos pedidos validos", () => {
    const metrics = computeAccountMetrics([
      makePedido({ valorTotal: 100 }),
      makePedido({ valorTotal: 300 }),
    ]);
    expect(metrics.ticketMedio).toBe(200);
  });

  it("retorna ticket medio zero quando todos os pedidos estao cancelados", () => {
    const metrics = computeAccountMetrics([
      makePedido({ status: "Cancelado", valorTotal: 100 }),
    ]);
    expect(metrics.totalPedidos).toBe(0);
    expect(metrics.ticketMedio).toBe(0);
  });

  it("soma a quantidade de itens dos pedidos validos", () => {
    const metrics = computeAccountMetrics([
      makePedido({
        itens: [
          makePedidoItem({ quantidade: 2 }),
          makePedidoItem({ quantidade: 3 }),
        ],
      }),
      makePedido({ itens: [makePedidoItem({ quantidade: 4 })] }),
      makePedido({
        status: "cancelado",
        itens: [makePedidoItem({ quantidade: 10 })],
      }),
    ]);
    expect(metrics.totalItens).toBe(9);
  });

  it("usa a data do pedido valido mais antigo em clienteDesde", () => {
    const metrics = computeAccountMetrics([
      makePedido({ dataPedido: "2026-03-01T10:00:00.000Z" }),
      makePedido({ dataPedido: "2025-11-20T10:00:00.000Z" }),
      makePedido({
        status: "Cancelado",
        dataPedido: "2024-01-01T10:00:00.000Z",
      }),
      makePedido({ dataPedido: "2026-01-05T10:00:00.000Z" }),
    ]);
    expect(metrics.clienteDesde).toBe("2025-11-20T10:00:00.000Z");
  });

  it("escolhe a parcela futura mais proxima entre todos os pedidos", () => {
    const metrics = computeAccountMetrics([
      makePedido({
        numeroPedidoOmie: "1001",
        parcelas: [
          makePedidoParcela({
            dataVencimento: "2026-06-01T00:00:00.000Z",
            valor: 10,
          }),
          makePedidoParcela({
            dataVencimento: "2026-08-01T00:00:00.000Z",
            valor: 20,
          }),
        ],
      }),
      makePedido({
        numeroPedidoOmie: "1002",
        parcelas: [
          makePedidoParcela({
            dataVencimento: "2026-07-01T00:00:00.000Z",
            valor: 30,
          }),
        ],
      }),
      makePedido({
        status: "Cancelado",
        numeroPedidoOmie: "1003",
        parcelas: [
          makePedidoParcela({
            dataVencimento: "2026-06-20T00:00:00.000Z",
            valor: 40,
          }),
        ],
      }),
    ]);
    expect(metrics.proximaParcela).toEqual({
      valor: 30,
      dataVencimento: "2026-07-01T00:00:00.000Z",
      numeroPedidoOmie: "1002",
    });
  });

  it("retorna proximaParcela nula quando todas ja venceram", () => {
    const metrics = computeAccountMetrics([
      makePedido({
        parcelas: [
          makePedidoParcela({ dataVencimento: "2026-05-01T00:00:00.000Z" }),
        ],
      }),
    ]);
    expect(metrics.proximaParcela).toBeNull();
  });

  it("considera parcela que vence exatamente agora", () => {
    const metrics = computeAccountMetrics([
      makePedido({
        parcelas: [makePedidoParcela({ dataVencimento: NOW, valor: 55 })],
      }),
    ]);
    expect(metrics.proximaParcela?.valor).toBe(55);
  });
});
