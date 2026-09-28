import { cpf } from "cpf-cnpj-validator";
import { describe, expect, it } from "vitest";
import {
  makeCartItem,
  makeCustomer,
  makeFormaPagamento,
  makeParcela,
} from "@/test/fixtures";
import { ORDER_ID_MAX_LENGTH } from "./checkout.constants";
import { buildCheckoutRequest, buildFinalizeRequest } from "./checkout.mapper";
import {
  checkoutRequestSchema,
  finalizarCheckoutRequestSchema,
  orderIdSchema,
} from "./checkout.schemas";

function buildCheckoutPayload() {
  return buildCheckoutRequest(
    [makeCartItem({ price: 10, quantity: 2 })],
    cpf.generate(),
  );
}

function buildFinalizePayload() {
  const parcela = makeParcela({ numeroParcelas: 2, diasVencimento: [30, 60] });
  return buildFinalizeRequest({
    customer: makeCustomer({ cpfCnpj: cpf.generate() }),
    items: [makeCartItem({ price: 10, quantity: 2 })],
    forma: makeFormaPagamento({ opcoesParcelamento: [parcela] }),
    parcela,
    tipoCliente: null,
    observacoes: "",
  });
}

function issueCodes(result: {
  error?: { issues: { code: string }[] };
}): string[] {
  return result.error?.issues.map((issue) => issue.code) ?? [];
}

describe("checkoutRequestSchema", () => {
  it("aceita payload valido gerado pelo mapper", () => {
    const payload = buildCheckoutPayload();
    expect(checkoutRequestSchema.parse(payload)).toEqual(payload);
  });

  it("aceita documento com mascara", () => {
    const payload = {
      ...buildCheckoutPayload(),
      cpfCnpj: cpf.generate({ formatted: true }),
    };
    expect(checkoutRequestSchema.safeParse(payload).success).toBe(true);
  });

  it("rejeita campos extras na raiz", () => {
    const result = checkoutRequestSchema.safeParse({
      ...buildCheckoutPayload(),
      admin: true,
    });
    expect(result.success).toBe(false);
    expect(issueCodes(result)).toContain("unrecognized_keys");
  });

  it("rejeita campos extras nos itens", () => {
    const payload = buildCheckoutPayload();
    const result = checkoutRequestSchema.safeParse({
      ...payload,
      itens: payload.itens.map((item) => ({ ...item, desconto: 5 })),
    });
    expect(result.success).toBe(false);
    expect(issueCodes(result)).toContain("unrecognized_keys");
  });

  it("rejeita lista de itens vazia", () => {
    expect(
      checkoutRequestSchema.safeParse({ ...buildCheckoutPayload(), itens: [] })
        .success,
    ).toBe(false);
  });

  it("rejeita documento invalido", () => {
    expect(
      checkoutRequestSchema.safeParse({
        ...buildCheckoutPayload(),
        cpfCnpj: "11111111111",
      }).success,
    ).toBe(false);
  });

  it("rejeita valores negativos", () => {
    expect(
      checkoutRequestSchema.safeParse({ ...buildCheckoutPayload(), total: -1 })
        .success,
    ).toBe(false);
  });

  it("rejeita quantidade zero ou fracionada", () => {
    const payload = buildCheckoutPayload();
    for (const quantidade of [0, 1.5]) {
      const result = checkoutRequestSchema.safeParse({
        ...payload,
        itens: payload.itens.map((item) => ({ ...item, quantidade })),
      });
      expect(result.success).toBe(false);
    }
  });
});

describe("finalizarCheckoutRequestSchema", () => {
  it("aceita payload valido gerado pelo mapper", () => {
    const payload = buildFinalizePayload();
    expect(finalizarCheckoutRequestSchema.parse(payload)).toEqual(payload);
  });

  it("rejeita campos extras", () => {
    const result = finalizarCheckoutRequestSchema.safeParse({
      ...buildFinalizePayload(),
      desconto: 10,
    });
    expect(result.success).toBe(false);
    expect(issueCodes(result)).toContain("unrecognized_keys");
  });

  it("rejeita lista de itens vazia", () => {
    expect(
      finalizarCheckoutRequestSchema.safeParse({
        ...buildFinalizePayload(),
        itens: [],
      }).success,
    ).toBe(false);
  });

  it("rejeita numero de parcelas zero", () => {
    expect(
      finalizarCheckoutRequestSchema.safeParse({
        ...buildFinalizePayload(),
        numeroParcelas: 0,
      }).success,
    ).toBe(false);
  });

  it("rejeita dias de vencimento negativos", () => {
    expect(
      finalizarCheckoutRequestSchema.safeParse({
        ...buildFinalizePayload(),
        diasVencimento: [-1],
      }).success,
    ).toBe(false);
  });
});

describe("orderIdSchema", () => {
  it("aceita letras, numeros e hifen", () => {
    expect(orderIdSchema.safeParse("abc-123-DEF").success).toBe(true);
  });

  it("aceita id no tamanho maximo", () => {
    const id = "a".repeat(ORDER_ID_MAX_LENGTH);
    expect(orderIdSchema.safeParse(id).success).toBe(true);
  });

  it("rejeita id acima do tamanho maximo", () => {
    expect(
      orderIdSchema.safeParse("a".repeat(ORDER_ID_MAX_LENGTH + 1)).success,
    ).toBe(false);
  });

  it("rejeita caracteres fora do padrao", () => {
    for (const id of ["", "abc/123", "../etc", "id com espaco", "id%2F"]) {
      expect(orderIdSchema.safeParse(id).success).toBe(false);
    }
  });
});
