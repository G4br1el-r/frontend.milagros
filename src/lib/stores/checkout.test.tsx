import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { CheckoutResponse } from "@/lib/checkout/checkout.types";
import { makeFormaPagamento, makeParcela } from "@/test/fixtures";
import {
  useCheckoutStore,
  useSelectedForma,
  useSelectedParcela,
} from "./checkout";

const parcelaAVista = makeParcela({ numeroParcelas: 1, codigoOmie: "000" });
const parcelaEmTres = makeParcela({ numeroParcelas: 3, codigoOmie: "A03" });
const formaCartao = makeFormaPagamento({
  id: "forma-cartao",
  tipoForma: "Cartao",
  opcoesParcelamento: [parcelaAVista, parcelaEmTres],
});
const formaSemOpcoes = makeFormaPagamento({
  id: "forma-boleto",
  tipoForma: "Boleto",
  opcoesParcelamento: [],
});

function buildValidation(): CheckoutResponse {
  return {
    valido: true,
    mensagem: null,
    primeiraCompra: false,
    tipoClienteDetectado: null,
    valorMinimoAplicado: 0,
    totalPedido: 100,
    formasPagamento: [formaCartao, formaSemOpcoes],
  };
}

describe("useCheckoutStore.selectForma", () => {
  beforeEach(() => {
    useCheckoutStore.getState().reset();
  });

  it("seleciona a forma e a primeira opcao de parcelamento", () => {
    useCheckoutStore.getState().selectForma(formaCartao);
    const state = useCheckoutStore.getState();
    expect(state.selectedFormaId).toBe("forma-cartao");
    expect(state.selectedParcelas).toBe(1);
  });

  it("define parcelas como null quando a forma nao tem opcoes", () => {
    useCheckoutStore.getState().selectForma(formaCartao);
    useCheckoutStore.getState().selectForma(formaSemOpcoes);
    const state = useCheckoutStore.getState();
    expect(state.selectedFormaId).toBe("forma-boleto");
    expect(state.selectedParcelas).toBeNull();
  });
});

describe("seletores de forma e parcela", () => {
  beforeEach(() => {
    useCheckoutStore.getState().reset();
  });

  it("retornam null sem validacao", () => {
    useCheckoutStore.getState().selectForma(formaCartao);
    expect(renderHook(() => useSelectedForma()).result.current).toBeNull();
    expect(renderHook(() => useSelectedParcela()).result.current).toBeNull();
  });

  it("retornam a forma e a parcela selecionadas", () => {
    useCheckoutStore.getState().setValidation(buildValidation());
    useCheckoutStore.getState().selectForma(formaCartao);
    const forma = renderHook(() => useSelectedForma());
    const parcela = renderHook(() => useSelectedParcela());
    expect(forma.result.current).toEqual(formaCartao);
    expect(parcela.result.current).toEqual(parcelaAVista);
    act(() => {
      useCheckoutStore.getState().selectParcelas(3);
    });
    expect(parcela.result.current).toEqual(parcelaEmTres);
  });

  it("retorna parcela null quando o numero de parcelas nao existe", () => {
    useCheckoutStore.getState().setValidation(buildValidation());
    useCheckoutStore.getState().selectForma(formaCartao);
    useCheckoutStore.getState().selectParcelas(12);
    expect(renderHook(() => useSelectedParcela()).result.current).toBeNull();
  });

  it("retorna parcela null para forma sem opcoes", () => {
    useCheckoutStore.getState().setValidation(buildValidation());
    useCheckoutStore.getState().selectForma(formaSemOpcoes);
    expect(renderHook(() => useSelectedForma()).result.current).toEqual(
      formaSemOpcoes,
    );
    expect(renderHook(() => useSelectedParcela()).result.current).toBeNull();
  });
});
