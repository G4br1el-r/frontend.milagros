export const CHECKOUT_STEPS = ["revisao", "pagamento", "sucesso"] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];
export const CHECKOUT_STEP_LABELS: Record<CheckoutStep, string> = {
  revisao: "Revisão",
  pagamento: "Pagamento",
  sucesso: "Concluído",
};
export const DEFAULT_UNIT = "UN";
export const PAYMENT_KIND_ORDER = ["Pix", "Cartao", "Boleto"] as const;
