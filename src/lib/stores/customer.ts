import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CUSTOMER_STORAGE_KEY } from "@/lib/customer/customer.constants";
import type { Customer } from "@/lib/customer/customer.types";
import type { CartItem } from "./cart";
export type PendingIntent =
  | { type: "add-to-cart"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "checkout" };
export type IdentityStep = "idle" | "document" | "register";
interface CustomerState {
  customer: Customer | null;
  step: IdentityStep;
  pendingIntent: PendingIntent | null;
  draftDocument: string;
  hasHydrated: boolean;
  requestIdentity: (intent: PendingIntent) => void;
  goToRegister: (document: string) => void;
  identify: (customer: Customer) => void;
  cancel: () => void;
  consumePendingIntent: () => PendingIntent | null;
  signOut: () => void;
  setHasHydrated: (value: boolean) => void;
}
export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      customer: null,
      step: "idle",
      pendingIntent: null,
      draftDocument: "",
      hasHydrated: false,
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
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: CUSTOMER_STORAGE_KEY,
      partialize: (state) => ({ customer: state.customer }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
export function useIsIdentified() {
  return useCustomerStore((state) => state.customer !== null);
}
