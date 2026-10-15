import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appToast } from "@/lib/toast/toast";
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variantName: string | null;
  image: string | null;
  price: number;
  quantity: number;
}
const CART_STORAGE_VERSION = 1;
const PARENT_PRODUCT_CODE_PREFIX = "PAI-";
interface PersistedCartV0Item {
  id: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
function isPersistedCartV0Item(value: unknown): value is PersistedCartV0Item {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    typeof value.quantity === "number"
  );
}
export function migrateCartFromV0(persisted: unknown): { items: CartItem[] } {
  const rawItems =
    isRecord(persisted) && Array.isArray(persisted.items)
      ? persisted.items
      : [];
  const items = rawItems
    .filter(isPersistedCartV0Item)
    .filter((item) => !item.id.startsWith(PARENT_PRODUCT_CODE_PREFIX))
    .map((item) => ({
      id: item.id,
      productId: item.id,
      name: item.name,
      variantName: null,
      image: typeof item.image === "string" ? item.image : null,
      price: item.price,
      quantity: item.quantity,
    }));
  return { items };
}
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setHasHydrated: (value: boolean) => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
        appToast.cartAdded();
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
        appToast.cartRemoved();
      },
      setQuantity: (id, quantity) => {
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
        if (quantity <= 0) appToast.cartRemoved();
      },
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "milagros-cart",
      version: CART_STORAGE_VERSION,
      migrate: migrateCartFromV0,
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
export function useCartCount(): number | null {
  return useCartStore((state) =>
    state.hasHydrated
      ? state.items.reduce((total, item) => total + item.quantity, 0)
      : null,
  );
}
export function useCartTotal() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  );
}
