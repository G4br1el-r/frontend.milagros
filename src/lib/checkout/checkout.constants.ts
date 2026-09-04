/** Etapas visiveis do fluxo de checkout. */
export const CHECKOUT_STEPS = ["revisao", "pagamento", "sucesso"] as const;

export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

export const CHECKOUT_STEP_LABELS: Record<CheckoutStep, string> = {
  revisao: "Revisão",
  pagamento: "Pagamento",
  sucesso: "Concluído",
};

/** Unidade padrao quando o produto nao traz `unidade` (a API costuma vir nula). */
export const DEFAULT_UNIT = "UN";

/** tipoForma observados na API, usados para escolher icone e ordem. */
export const PAYMENT_KIND_ORDER = ["Pix", "Cartao", "Boleto"] as const;
