import { describe, expect, it } from "vitest";
import { makeFormaPagamento } from "@/test/fixtures";
import { PAYMENT_KIND_ORDER } from "./checkout.constants";
import { formatInstallmentLabel, sortPaymentMethods } from "./checkout.format";

function normalizeSpaces(value: string): string {
  return value.replace(/\s/g, " ");
}

function formatBrl(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

describe("sortPaymentMethods", () => {
  it("ordena conforme PAYMENT_KIND_ORDER e deixa tipos desconhecidos no fim", () => {
    const formas = [
      makeFormaPagamento({ id: "boleto", tipoForma: "Boleto" }),
      makeFormaPagamento({ id: "cheque", tipoForma: "Cheque" }),
      makeFormaPagamento({ id: "pix", tipoForma: "Pix" }),
      makeFormaPagamento({ id: "cartao", tipoForma: "Cartao" }),
    ];
    const sorted = sortPaymentMethods(formas);
    expect(sorted.map((forma) => forma.tipoForma)).toEqual([
      ...PAYMENT_KIND_ORDER,
      "Cheque",
    ]);
  });

  it("mantem a ordem original entre tipos desconhecidos", () => {
    const formas = [
      makeFormaPagamento({ id: "cheque", tipoForma: "Cheque" }),
      makeFormaPagamento({ id: "deposito", tipoForma: "Deposito" }),
      makeFormaPagamento({ id: "pix", tipoForma: "Pix" }),
    ];
    expect(sortPaymentMethods(formas).map((forma) => forma.id)).toEqual([
      "pix",
      "cheque",
      "deposito",
    ]);
  });

  it("nao altera o array recebido", () => {
    const formas = [
      makeFormaPagamento({ id: "boleto", tipoForma: "Boleto" }),
      makeFormaPagamento({ id: "pix", tipoForma: "Pix" }),
    ];
    sortPaymentMethods(formas);
    expect(formas.map((forma) => forma.id)).toEqual(["boleto", "pix"]);
  });
});

describe("formatInstallmentLabel", () => {
  it("usa prazosDescricao quando informado", () => {
    expect(formatInstallmentLabel(3, 50, "30/60/90 dias")).toBe(
      "30/60/90 dias",
    );
  });

  it("formata pagamento a vista", () => {
    const label = formatInstallmentLabel(1, 150, null);
    expect(label).toBe(`À vista ${formatBrl(150)}`);
    expect(normalizeSpaces(label)).toBe("À vista R$ 150,00");
  });

  it("formata pagamento parcelado em pt-BR", () => {
    const label = formatInstallmentLabel(3, 1234.5, null);
    expect(label).toBe(`3x de ${formatBrl(1234.5)}`);
    expect(normalizeSpaces(label)).toBe("3x de R$ 1.234,50");
  });

  it("ignora prazosDescricao vazio", () => {
    expect(normalizeSpaces(formatInstallmentLabel(2, 10, ""))).toBe(
      "2x de R$ 10,00",
    );
  });
});
