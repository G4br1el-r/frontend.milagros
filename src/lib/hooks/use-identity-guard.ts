"use client";
import { useCallback } from "react";
import type { CartItem } from "@/lib/stores/cart";
import { useCartStore } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import type { PendingIntent } from "@/lib/stores/customer";
import { useCustomerStore } from "@/lib/stores/customer";
export function useIdentityGuard() {
  const customer = useCustomerStore((state) => state.customer);
  const requestIdentity = useCustomerStore((state) => state.requestIdentity);
  const addItem = useCartStore((state) => state.addItem);
  const closeCart = useCartStore((state) => state.close);
  const openCheckout = useCheckoutStore((state) => state.open);
  const resetCheckout = useCheckoutStore((state) => state.reset);
  const runIntent = useCallback(
    (intent: PendingIntent) => {
      if (intent.type === "add-to-cart") {
        addItem(intent.item, intent.quantity);
        return;
      }
      resetCheckout();
      closeCart();
      openCheckout();
    },
    [addItem, closeCart, openCheckout, resetCheckout],
  );
  const guard = useCallback(
    (intent: PendingIntent) => {
      if (customer) {
        runIntent(intent);
        return;
      }
      requestIdentity(intent);
    },
    [customer, requestIdentity, runIntent],
  );
  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) =>
      guard({ type: "add-to-cart", item, quantity }),
    [guard],
  );
  const checkout = useCallback(() => guard({ type: "checkout" }), [guard]);
  return { addToCart, checkout, runIntent, isIdentified: customer !== null };
}
