import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CheckoutApiError,
  finalizeCheckout,
  validateCheckout,
} from "@/lib/checkout/checkout.client";
import {
  buildCheckoutRequest,
  buildFinalizeRequest,
} from "@/lib/checkout/checkout.mapper";
import type {
  CheckoutResponse,
  FinalizarCheckoutResponse,
} from "@/lib/checkout/checkout.types";
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";
import { useCartStore } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { useCustomerStore } from "@/lib/stores/customer";
import {
  makeCartItem,
  makeCustomer,
  makeFormaPagamento,
  makeParcela,
} from "@/test/fixtures";
import { useCheckout } from "./use-checkout";

vi.mock("@/lib/checkout/checkout.client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/checkout/checkout.client")>();
  return {
    ...actual,
    validateCheckout: vi.fn(),
    finalizeCheckout: vi.fn(),
  };
});

const VALIDATE_FALLBACK =
  "Nao foi possivel validar o pedido agora. Tente novamente.";
const FINALIZE_FALLBACK =
  "Nao foi possivel emitir o pedido agora. Tente novamente.";
const CLIENT_ERROR_STATUS = 400;

const customer = makeCustomer();
const items = [makeCartItem({ id: "a", price: 10, quantity: 2 })];
const parcela = makeParcela({ numeroParcelas: 2, codigoOmie: "A02" });
const forma = makeFormaPagamento({
  id: "forma-cartao",
  opcoesParcelamento: [parcela],
});

function buildValidation(): CheckoutResponse {
  return {
    valido: true,
    mensagem: null,
    primeiraCompra: false,
    tipoClienteDetectado: "Varejo",
    valorMinimoAplicado: 0,
    totalPedido: 20,
    formasPagamento: [forma],
  };
}

function buildFinalizeResponse(): FinalizarCheckoutResponse {
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
  };
}

function selectPaymentReadyForFinalize() {
  useCheckoutStore.getState().setValidation(buildValidation());
  useCheckoutStore.getState().selectForma(forma);
}

describe("useCheckout", () => {
  beforeEach(() => {
    vi.mocked(validateCheckout).mockReset();
    vi.mocked(finalizeCheckout).mockReset();
    useCartStore.setState({ items: [], isOpen: false, hasHydrated: true });
    useCustomerStore.setState({
      customer: null,
      step: "idle",
      pendingIntent: null,
      draftDocument: "",
    });
    useCheckoutStore.getState().reset();
  });

  describe("validate", () => {
    it("nao valida sem cliente identificado", async () => {
      useCartStore.setState({ items });
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(validateCheckout).not.toHaveBeenCalled();
      expect(useCheckoutStore.getState().isValidating).toBe(false);
    });

    it("nao valida com carrinho vazio", async () => {
      useCustomerStore.setState({ customer });
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(validateCheckout).not.toHaveBeenCalled();
    });

    it("envia o pedido e guarda a validacao", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      const validation = buildValidation();
      vi.mocked(validateCheckout).mockResolvedValue(validation);
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(validateCheckout).toHaveBeenCalledWith(
        buildCheckoutRequest(items, customer.cpfCnpj),
      );
      const state = useCheckoutStore.getState();
      expect(state.validation).toEqual(validation);
      expect(state.isValidating).toBe(false);
      expect(state.validationError).toBeNull();
    });

    it("mostra a mensagem da API para erro de cliente", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      vi.mocked(validateCheckout).mockRejectedValue(
        new CheckoutApiError(CLIENT_ERROR_STATUS, "Pedido abaixo do minimo"),
      );
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(useCheckoutStore.getState().validationError).toBe(
        "Pedido abaixo do minimo",
      );
    });

    it("usa mensagem generica a partir de SERVER_ERROR_MIN_STATUS", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      vi.mocked(validateCheckout).mockRejectedValue(
        new CheckoutApiError(SERVER_ERROR_MIN_STATUS, "stack interna"),
      );
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(useCheckoutStore.getState().validationError).toBe(
        VALIDATE_FALLBACK,
      );
    });

    it("usa mensagem generica para erro desconhecido", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      vi.mocked(validateCheckout).mockRejectedValue(new Error("rede"));
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.validate();
      });
      expect(useCheckoutStore.getState().validationError).toBe(
        VALIDATE_FALLBACK,
      );
    });
  });

  describe("finalize", () => {
    it("nao finaliza sem forma e parcela selecionadas", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      const { result } = renderHook(() => useCheckout());
      expect(result.current.canFinalize).toBe(false);
      await act(async () => {
        await result.current.finalize();
      });
      expect(finalizeCheckout).not.toHaveBeenCalled();
    });

    it("nao finaliza sem cliente identificado", async () => {
      useCartStore.setState({ items });
      selectPaymentReadyForFinalize();
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.finalize();
      });
      expect(finalizeCheckout).not.toHaveBeenCalled();
    });

    it("envia o pedido com forma, parcela e tipo de cliente detectado", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      selectPaymentReadyForFinalize();
      useCheckoutStore.getState().setObservacoes("Sem troco");
      vi.mocked(finalizeCheckout).mockResolvedValue(buildFinalizeResponse());
      const { result } = renderHook(() => useCheckout());
      expect(result.current.canFinalize).toBe(true);
      await act(async () => {
        await result.current.finalize();
      });
      expect(finalizeCheckout).toHaveBeenCalledWith(
        buildFinalizeRequest({
          customer,
          items,
          forma,
          parcela,
          tipoCliente: "Varejo",
          observacoes: "Sem troco",
        }),
      );
      expect(useCheckoutStore.getState().step).toBe("sucesso");
    });

    it("mostra a mensagem da API para erro de cliente", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      selectPaymentReadyForFinalize();
      vi.mocked(finalizeCheckout).mockRejectedValue(
        new CheckoutApiError(CLIENT_ERROR_STATUS, "Parcela indisponivel"),
      );
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.finalize();
      });
      const state = useCheckoutStore.getState();
      expect(state.finalizeError).toBe("Parcela indisponivel");
      expect(state.isFinalizing).toBe(false);
    });

    it("usa mensagem generica para erro de servidor", async () => {
      useCustomerStore.setState({ customer });
      useCartStore.setState({ items });
      selectPaymentReadyForFinalize();
      vi.mocked(finalizeCheckout).mockRejectedValue(
        new CheckoutApiError(SERVER_ERROR_MIN_STATUS, "stack interna"),
      );
      const { result } = renderHook(() => useCheckout());
      await act(async () => {
        await result.current.finalize();
      });
      expect(useCheckoutStore.getState().finalizeError).toBe(FINALIZE_FALLBACK);
    });
  });
});
