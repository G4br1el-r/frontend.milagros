import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CUSTOMER_STORAGE_KEY } from "@/lib/customer/customer.constants";
import type { Customer } from "@/lib/customer/customer.types";
import type { CartItem } from "./cart";

/**
 * Acao que o usuario pediu antes de ser identificado. Guardamos para concluir
 * assim que a identificacao terminar — sem isso o item escolhido se perderia.
 */
export type PendingIntent =
  | { type: "add-to-cart"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "checkout" };

/** Etapa visivel do fluxo de identificacao. */
export type IdentityStep = "idle" | "document" | "register";

interface CustomerState {
  customer: Customer | null;
  step: IdentityStep;
  pendingIntent: PendingIntent | null;
  /** Documento digitado no modal, reaproveitado como valor inicial do cadastro. */
  draftDocument: string;

  requestIdentity: (intent: PendingIntent) => void;
  goToRegister: (document: string) => void;
  identify: (customer: Customer) => void;
  cancel: () => void;
  consumePendingIntent: () => PendingIntent | null;
  signOut: () => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customer: null,
      step: "idle",
      pendingIntent: null,
      draftDocument: "",

      requestIdentity: (intent) =>
        set({ step: "document", pendingIntent: intent, draftDocument: "" }),

      goToRegister: (document) =>
        set({ step: "register", draftDocument: document }),

      identify: (customer) => set({ customer, step: "idle" }),

      cancel: () =>
        set({ step: "idle", pendingIntent: null, draftDocument: "" }),

      consumePendingIntent: () => {
        const { pendingIntent } = get();
        if (pendingIntent) set({ pendingIntent: null });
        return pendingIntent;
      },

      signOut: () =>
        set({
          customer: null,
          step: "idle",
          pendingIntent: null,
          draftDocument: "",
        }),
    }),
    {
      name: CUSTOMER_STORAGE_KEY,
      // Apenas o cliente persiste; estado de UI e intencao morrem com a sessao.
      partialize: (state) => ({ customer: state.customer }),
    },
  ),
);

export function useIsIdentified() {
  return useCustomerStore((state) => state.customer !== null);
}
