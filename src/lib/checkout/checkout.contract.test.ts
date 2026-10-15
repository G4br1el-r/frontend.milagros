import { cpf } from "cpf-cnpj-validator";
import { describe, expect, it } from "vitest";
import {
  makeCartItem,
  makeCustomer,
  makeFormaPagamento,
  makeParcela,
} from "@/test/fixtures";
import { buildCheckoutRequest, buildFinalizeRequest } from "./checkout.mapper";
import {
  checkoutRequestSchema,
  finalizarCheckoutRequestSchema,
} from "./checkout.schemas";

const SWAGGER_ITEM_CHECKOUT_DTO = [
  "codigoOmie",
  "descricao",
  "unidade",
  "quantidade",
  "precoUnitario",
  "subtotal",
];
const SWAGGER_CHECKOUT_REQUEST = [
  "cpfCnpj",
  "tipoCliente",
  "subtotal",
  "desconto",
  "total",
  "itens",
];
const SWAGGER_FINALIZAR_CHECKOUT_REQUEST = [
  "codigoClienteOmie",
  "cpfCnpj",
  "tipoCliente",
  "nomeRazaoSocial",
  "email",
  "telefone",
  "cep",
  "logradouro",
  "numero",
  "complemento",
  "bairro",
  "cidade",
  "estado",
  "itens",
  "formaPagamentoId",
  "formaPagamentoNome",
  "numeroParcelas",
  "codigoParcela",
  "diasVencimento",
  "observacoes",
];

const VARIANT_ITEMS = [
  makeCartItem({
    id: "BYZi05B",
    productId: "PAI-1-GREGO-BYZANTINE-INTENSO",
    name: "#1 GREGO BYZANTINE INTENSO",
    variantName: "Barrica de 50g",
    price: 36.25,
    quantity: 1,
  }),
  makeCartItem({
    id: "BYZi30B",
    productId: "PAI-1-GREGO-BYZANTINE-INTENSO",
    name: "#1 GREGO BYZANTINE INTENSO",
    variantName: "Barrica de 300g",
    price: 179.77,
    quantity: 2,
  }),
];

function sortedKeys(value: object): string[] {
  return Object.keys(value).sort();
}

describe("contrato do checkout com o swagger da API", () => {
  it("POST /api/checkout envia exatamente os campos de CheckoutRequest", () => {
    const payload = buildCheckoutRequest(VARIANT_ITEMS, cpf.generate());
    expect(sortedKeys(payload)).toEqual([...SWAGGER_CHECKOUT_REQUEST].sort());
    for (const item of payload.itens) {
      expect(sortedKeys(item)).toEqual([...SWAGGER_ITEM_CHECKOUT_DTO].sort());
    }
    expect(checkoutRequestSchema.safeParse(payload).success).toBe(true);
  });

  it("POST /api/checkout/finalizar envia exatamente os campos de FinalizarCheckoutRequest", () => {
    const parcela = makeParcela();
    const payload = buildFinalizeRequest({
      customer: makeCustomer({ cpfCnpj: cpf.generate() }),
      items: VARIANT_ITEMS,
      forma: makeFormaPagamento({ opcoesParcelamento: [parcela] }),
      parcela,
      tipoCliente: null,
      observacoes: "",
    });
    expect(sortedKeys(payload)).toEqual(
      [...SWAGGER_FINALIZAR_CHECKOUT_REQUEST].sort(),
    );
    for (const item of payload.itens) {
      expect(sortedKeys(item)).toEqual([...SWAGGER_ITEM_CHECKOUT_DTO].sort());
    }
    expect(finalizarCheckoutRequestSchema.safeParse(payload).success).toBe(
      true,
    );
  });

  it("itens de variacao saem com o codigo vendavel, nunca o do pai", () => {
    const payload = buildCheckoutRequest(VARIANT_ITEMS, cpf.generate());
    expect(payload.itens.map((item) => item.codigoOmie)).toEqual([
      "BYZi05B",
      "BYZi30B",
    ]);
    expect(payload.subtotal).toBe(395.79);
    expect(payload.total).toBe(395.79);
  });
});
