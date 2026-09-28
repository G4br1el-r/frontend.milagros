import { describe, expect, it } from "vitest";
import { makePedido } from "@/test/fixtures";
import { summarizeQuote } from "./quote-status";

describe("summarizeQuote", () => {
  it("fica pendente enquanto a Milagros nao confirma o valor", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: null }),
    );
    expect(quote.outcome).toBe("pendente");
    expect(quote.valorOrcado).toBe(900);
    expect(quote.valorConfirmado).toBeNull();
  });

  it("trata valorFinal zerado como pendente, pois a API usa zero como padrao", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: 0 }),
    );
    expect(quote.outcome).toBe("pendente");
    expect(quote.valorConfirmado).toBeNull();
  });

  it("usa valorTotal como orcado quando valorOrcamento vem zerado", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 750, valorOrcamento: 0, valorFinal: null }),
    );
    expect(quote.valorOrcado).toBe(750);
  });

  it("confirma sem alteracao quando os valores batem", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: 900 }),
    );
    expect(quote.outcome).toBe("igual");
    expect(quote.diferenca).toBe(0);
    expect(quote.valorConfirmado).toBe(900);
  });

  it("detecta ajuste para mais", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: 1000 }),
    );
    expect(quote.outcome).toBe("maior");
    expect(quote.diferenca).toBe(100);
  });

  it("detecta ajuste para menos", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: 820 }),
    );
    expect(quote.outcome).toBe("menor");
    expect(quote.diferenca).toBe(-80);
  });

  it("compara contra o valor orcado, nao contra o total", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 950, valorFinal: 950 }),
    );
    expect(quote.valorOrcado).toBe(950);
    expect(quote.outcome).toBe("igual");
  });
});

describe("summarizeQuote em pedidos cancelados", () => {
  it("marca como encerrado em vez de prometer confirmacao", () => {
    const quote = summarizeQuote(
      makePedido({ status: "Cancelado", valorTotal: 900, valorFinal: null }),
    );
    expect(quote.outcome).toBe("encerrado");
    expect(quote.valorConfirmado).toBeNull();
  });

  it("aceita a variacao cancelada e ignora caixa e espacos", () => {
    const quote = summarizeQuote(
      makePedido({ status: "  CANCELADA  ", valorFinal: null }),
    );
    expect(quote.outcome).toBe("encerrado");
  });

  it("mantem o valor confirmado quando o cancelamento veio depois", () => {
    const quote = summarizeQuote(
      makePedido({ status: "Cancelado", valorOrcamento: 900, valorFinal: 880 }),
    );
    expect(quote.outcome).toBe("menor");
    expect(quote.valorConfirmado).toBe(880);
  });
});
