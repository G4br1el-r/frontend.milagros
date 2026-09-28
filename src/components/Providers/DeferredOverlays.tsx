"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useCartStore } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { useCustomerStore } from "@/lib/stores/customer";

const CartSheet = dynamic(
  () =>
    import("@/components/Modules/Catalog/Cart/CartSheet").then(
      (m) => m.CartSheet,
    ),
  { ssr: false },
);
const CheckoutSheet = dynamic(
  () =>
    import("@/components/Modules/Catalog/Checkout").then(
      (m) => m.CheckoutSheet,
    ),
  { ssr: false },
);
const IdentityGate = dynamic(
  () =>
    import("@/components/Modules/Catalog/Identity/IdentityGate").then(
      (m) => m.IdentityGate,
    ),
  { ssr: false },
);
function useMountAfterFirstOpen(isOpen: boolean): boolean {
  const [hasOpened, setHasOpened] = useState(false);
  if (isOpen && !hasOpened) setHasOpened(true);
  return isOpen || hasOpened;
}
export function DeferredOverlays() {
  const isCartOpen = useCartStore((state) => state.isOpen);
  const isCheckoutOpen = useCheckoutStore((state) => state.isOpen);
  const isIdentityOpen = useCustomerStore((state) => state.step !== "idle");
  const shouldMountCart = useMountAfterFirstOpen(isCartOpen);
  const shouldMountCheckout = useMountAfterFirstOpen(isCheckoutOpen);
  const shouldMountIdentity = useMountAfterFirstOpen(isIdentityOpen);
  return (
    <>
      {shouldMountCart && <CartSheet />}
      {shouldMountCheckout && <CheckoutSheet />}
      {shouldMountIdentity && <IdentityGate />}
    </>
  );
}
