"use client";

import dynamic from "next/dynamic";

/**
 * CartSheet, CheckoutSheet e IdentityGate so importam react-hook-form, zod,
 * react-imask e cpf-cnpj-validator quando o usuario de fato abre um desses
 * fluxos. Sem isso, todo visitante que so olha o catalogo baixa o bundle de
 * cadastro e checkout no first load. ssr: false porque nenhum dos tres
 * renderiza nada visivel antes de uma acao do usuario (sheet fechado, gate
 * sem intencao pendente) — não ha custo de CLS em adiar para o cliente.
 */
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
