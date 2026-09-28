"use client";
import { useCallback } from "react";
import {
  CheckoutApiError,
  finalizeCheckout,
  validateCheckout,
} from "@/lib/checkout/checkout.client";
import {
  buildCheckoutRequest,
  buildFinalizeRequest,
} from "@/lib/checkout/checkout.mapper";
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";
import { useCartStore } from "@/lib/stores/cart";
import {
  useCheckoutStore,
  useSelectedForma,
  useSelectedParcela,
} from "@/lib/stores/checkout";
import { useCustomerStore } from "@/lib/stores/customer";

function checkoutErrorMessage(error: unknown, fallback: string): string {
  const isClientError =
    error instanceof CheckoutApiError && error.status < SERVER_ERROR_MIN_STATUS;
  return isClientError ? error.message : fallback;
}
export function useCheckout() {
  const items = useCartStore((state) => state.items);
  const customer = useCustomerStore((state) => state.customer);
  const startValidation = useCheckoutStore((state) => state.startValidation);
  const setValidation = useCheckoutStore((state) => state.setValidation);
  const failValidation = useCheckoutStore((state) => state.failValidation);
  const startFinalize = useCheckoutStore((state) => state.startFinalize);
  const setResult = useCheckoutStore((state) => state.setResult);
  const failFinalize = useCheckoutStore((state) => state.failFinalize);
  const validation = useCheckoutStore((state) => state.validation);
  const observacoes = useCheckoutStore((state) => state.observacoes);
  const forma = useSelectedForma();
  const parcela = useSelectedParcela();
  const validate = useCallback(async () => {
    if (!customer || items.length === 0) return;
    startValidation();
    try {
      const resultado = await validateCheckout(
        buildCheckoutRequest(items, customer.cpfCnpj),
      );
      setValidation(resultado);
    } catch (error) {
      failValidation(
        checkoutErrorMessage(
          error,
          "Nao foi possivel validar o pedido agora. Tente novamente.",
        ),
      );
    }
  }, [customer, items, startValidation, setValidation, failValidation]);
  const finalize = useCallback(async () => {
    if (!customer || !forma || !parcela) return;
    startFinalize();
    try {
      const resultado = await finalizeCheckout(
        buildFinalizeRequest({
          customer,
          items,
          forma,
          parcela,
          tipoCliente: validation?.tipoClienteDetectado ?? null,
          observacoes,
        }),
      );
      setResult(resultado);
    } catch (error) {
      failFinalize(
        checkoutErrorMessage(
          error,
          "Nao foi possivel emitir o pedido agora. Tente novamente.",
        ),
      );
    }
  }, [
    customer,
    forma,
    parcela,
    items,
    validation,
    observacoes,
    startFinalize,
    setResult,
    failFinalize,
  ]);
  return { validate, finalize, canFinalize: Boolean(forma && parcela) };
}
