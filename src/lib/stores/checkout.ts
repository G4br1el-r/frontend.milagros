import { create } from "zustand";
import type { CheckoutStep } from "@/lib/checkout/checkout.constants";
import type {
  CheckoutResponse,
  FinalizarCheckoutResponse,
  FormaPagamentoDto,
  ParcelaOpcaoDto,
} from "@/lib/checkout/checkout.types";

interface CheckoutState {
  isOpen: boolean;
  step: CheckoutStep;

  /** Resultado da etapa 1; guarda as formas de pagamento elegiveis. */
  validation: CheckoutResponse | null;
  isValidating: boolean;
  validationError: string | null;

  selectedFormaId: string | null;
  selectedParcelas: number | null;
  observacoes: string;

  isFinalizing: boolean;
  finalizeError: string | null;
  result: FinalizarCheckoutResponse | null;

  open: () => void;
  close: () => void;
  reset: () => void;
  goToStep: (step: CheckoutStep) => void;

  startValidation: () => void;
  setValidation: (validation: CheckoutResponse) => void;
  failValidation: (message: string) => void;

  selectForma: (forma: FormaPagamentoDto) => void;
  selectParcelas: (numeroParcelas: number) => void;
  setObservacoes: (value: string) => void;

  startFinalize: () => void;
  setResult: (result: FinalizarCheckoutResponse) => void;
  failFinalize: (message: string) => void;
}

const initialState = {
  isOpen: false,
  step: "revisao" as CheckoutStep,
  validation: null,
  isValidating: false,
  validationError: null,
  selectedFormaId: null,
  selectedParcelas: null,
  observacoes: "",
  isFinalizing: false,
  finalizeError: null,
  result: null,
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  ...initialState,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  reset: () => set(initialState),

  goToStep: (step) => set({ step }),

  startValidation: () =>
    set({ isValidating: true, validationError: null, validation: null }),

  setValidation: (validation) =>
    set({
      validation,
      isValidating: false,
      // So avanca para o pagamento quando o carrinho passa nas regras.
      step: validation.valido ? "pagamento" : "revisao",
    }),

  failValidation: (message) =>
    set({ isValidating: false, validationError: message }),

  selectForma: (forma) =>
    set({
      selectedFormaId: forma.id,
      // Pre-seleciona a primeira opcao para a UI nunca ficar sem parcela.
      selectedParcelas: forma.opcoesParcelamento[0]?.numeroParcelas ?? null,
    }),

  selectParcelas: (numeroParcelas) => set({ selectedParcelas: numeroParcelas }),

  setObservacoes: (observacoes) => set({ observacoes }),

  startFinalize: () => set({ isFinalizing: true, finalizeError: null }),

  setResult: (result) =>
    set({
      result,
      isFinalizing: false,
      step: result.sucesso ? "sucesso" : "pagamento",
      finalizeError: result.sucesso ? null : result.mensagem,
    }),

  failFinalize: (message) =>
    set({ isFinalizing: false, finalizeError: message }),
}));

/** Forma de pagamento atualmente escolhida. */
export function useSelectedForma(): FormaPagamentoDto | null {
  return useCheckoutStore(
    (state) =>
      state.validation?.formasPagamento.find(
        (forma) => forma.id === state.selectedFormaId,
      ) ?? null,
  );
}

/** Opcao de parcelamento escolhida dentro da forma selecionada. */
export function useSelectedParcela(): ParcelaOpcaoDto | null {
  return useCheckoutStore((state) => {
    const forma = state.validation?.formasPagamento.find(
      (item) => item.id === state.selectedFormaId,
    );

    return (
      forma?.opcoesParcelamento.find(
        (opcao) => opcao.numeroParcelas === state.selectedParcelas,
      ) ?? null
    );
  });
}
