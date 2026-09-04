import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appToast } from "@/lib/toast/toast";

export interface CartItem {
  id: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  /**
   * Falso ate o persist reidratar do localStorage. O servidor sempre renderiza
   * falso, entao quem depende de `items` espera esta flag em vez de mostrar 0
   * e piscar para N depois da hidratacao.
   */
  hasHydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  /** Esvazia o carrinho sem toast — usado apos o pedido ser emitido. */
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
      partialize: (state) => ({ items: state.items }),
      // Dispara ao fim da reidratacao — inclusive quando nao ha nada salvo,
      // caso em que o segundo argumento vem indefinido.
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

/**
 * Contagem do carrinho, ou `null` enquanto o store nao reidratou. Consumidores
 * usam `null` para renderizar estado neutro em vez de zero.
 */
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
