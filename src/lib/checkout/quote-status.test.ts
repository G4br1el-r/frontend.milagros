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

  it("trata valorFinal zerado como ainda pendente", () => {
    const quote = summarizeQuote(
      makePedido({ valorTotal: 900, valorOrcamento: 900, valorFinal: 0 }),
    );
    expect(quote.outcome).toBe("pendente");
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
});
