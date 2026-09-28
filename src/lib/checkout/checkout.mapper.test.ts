import { describe, expect, it } from "vitest";
import {
  makeCartItem,
  makeCustomer,
  makeFormaPagamento,
  makeParcela,
} from "@/test/fixtures";
import { DEFAULT_UNIT } from "./checkout.constants";
import {
  buildCheckoutRequest,
  buildFinalizeRequest,
  cartItemToCheckoutItem,
} from "./checkout.mapper";

describe("cartItemToCheckoutItem", () => {
  it("mapeia item do carrinho para item de checkout", () => {
    const item = makeCartItem({
      id: "42",
      name: "Incenso",
      price: 12.5,
      quantity: 2,
    });
    expect(cartItemToCheckoutItem(item)).toEqual({
      codigoOmie: "42",
      descricao: "Incenso",
      unidade: DEFAULT_UNIT,
      quantidade: 2,
      precoUnitario: 12.5,
      subtotal: 25,
    });
  });

  it("arredonda o subtotal para centavos", () => {
    expect(
      cartItemToCheckoutItem(makeCartItem({ price: 0.1, quantity: 3 }))
        .subtotal,
    ).toBe(0.3);
    expect(
      cartItemToCheckoutItem(makeCartItem({ price: 19.99, quantity: 3 }))
        .subtotal,
    ).toBe(59.97);
    expect(
      cartItemToCheckoutItem(makeCartItem({ price: 10.333, quantity: 1 }))
        .subtotal,
    ).toBe(10.33);
  });
});

describe("buildCheckoutRequest", () => {
  it("soma os subtotais arredondados e usa desconto zero", () => {
    const items = [
      makeCartItem({ id: "a", price: 0.1, quantity: 1 }),
      makeCartItem({ id: "b", price: 0.2, quantity: 1 }),
    ];
    const request = buildCheckoutRequest(items, "52998224725");
    expect(request).toEqual({
      cpfCnpj: "52998224725",
      tipoCliente: null,
      subtotal: 0.3,
      desconto: 0,
      total: 0.3,
      itens: items.map(cartItemToCheckoutItem),
    });
  });

  it("gera total zero para carrinho vazio", () => {
    const request = buildCheckoutRequest([], "52998224725");
    expect(request.subtotal).toBe(0);
    expect(request.total).toBe(0);
    expect(request.itens).toEqual([]);
  });
});

describe("buildFinalizeRequest", () => {
  it("monta o payload de finalizacao a partir do cliente, forma e parcela", () => {
    const customer = makeCustomer();
    const items = [makeCartItem({ price: 30, quantity: 2 })];
    const parcela = makeParcela({
      numeroParcelas: 3,
      codigoOmie: "A03",
      diasVencimento: [30, 60, 90],
    });
    const forma = makeFormaPagamento({
      id: "forma-cartao",
      nome: "Cartao de credito",
      opcoesParcelamento: [parcela],
    });
    expect(
      buildFinalizeRequest({
        customer,
        items,
        forma,
        parcela,
        tipoCliente: "Varejo",
        observacoes: "Entregar pela manha",
      }),
    ).toEqual({
      codigoClienteOmie: customer.codigoClienteOmie,
      cpfCnpj: customer.cpfCnpj,
      tipoCliente: "Varejo",
      nomeRazaoSocial: customer.nomeRazaoSocial,
      email: customer.email,
      telefone: customer.telefone,
      cep: customer.cep,
      logradouro: customer.logradouro,
      numero: customer.numero,
      complemento: customer.complemento,
      bairro: customer.bairro,
      cidade: customer.cidade,
      estado: customer.uf,
      itens: items.map(cartItemToCheckoutItem),
      formaPagamentoId: "forma-cartao",
      formaPagamentoNome: "Cartao de credito",
      numeroParcelas: 3,
      codigoParcela: "A03",
      diasVencimento: [30, 60, 90],
      observacoes: "Entregar pela manha",
    });
  });
});
