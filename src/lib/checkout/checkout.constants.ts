export const CHECKOUT_STEPS = ["revisao", "pagamento", "sucesso"] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];
export const CHECKOUT_STEP_LABELS: Record<CheckoutStep, string> = {
  revisao: "Revisão",
  pagamento: "Pagamento",
  sucesso: "Concluído",
};
export const DEFAULT_UNIT = "UN";
export const QUOTE_NOTICE_TITLE = "Este é um orçamento";
export const QUOTE_NOTICE_SHORT = "Valores sujeitos a alteração";
export const QUOTE_NOTICE_DESCRIPTION =
  "Os valores são uma estimativa e podem mudar após a conferência do pedido pela nossa equipe. A confirmação final é enviada junto com o pedido.";
export const PAYMENT_KIND_ORDER = ["Pix", "Cartao", "Boleto"] as const;
export const ORDER_ID_MAX_LENGTH = 64;
export const ORDER_ID_PATTERN = /^[A-Za-z0-9-]+$/;
