import type { PedidoDetalhesDto } from "./checkout.types";

export type QuoteOutcome = "pendente" | "igual" | "maior" | "menor";

export interface QuoteSummary {
  outcome: QuoteOutcome;
  valorOrcado: number;
  valorConfirmado: number | null;
  diferenca: number;
}
function hasValue(value: number | null | undefined): value is number {
  return typeof value === "number" && value > 0;
}
export function summarizeQuote(order: PedidoDetalhesDto): QuoteSummary {
  const valorOrcado = hasValue(order.valorOrcamento)
    ? order.valorOrcamento
    : order.valorTotal;
  if (!hasValue(order.valorFinal)) {
    return {
      outcome: "pendente",
      valorOrcado,
      valorConfirmado: null,
      diferenca: 0,
    };
  }
  const diferenca = order.valorFinal - valorOrcado;
  const outcome: QuoteOutcome =
    diferenca === 0 ? "igual" : diferenca > 0 ? "maior" : "menor";
  return {
    outcome,
    valorOrcado,
    valorConfirmado: order.valorFinal,
    diferenca,
  };
}
