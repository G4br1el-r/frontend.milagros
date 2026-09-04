"use client";
import dynamic from "next/dynamic";

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
    import("@/components/Modules/Catalog/Identity").then((m) => m.IdentityGate),
  { ssr: false },
);
export function DeferredOverlays() {
  return (
    <>
      <CartSheet />
      <CheckoutSheet />
      <IdentityGate />
    </>
  );
}
