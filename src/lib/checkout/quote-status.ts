import { CANCELLED_ORDER_STATUSES } from "./checkout.constants";
import type { PedidoDetalhesDto } from "./checkout.types";

export type QuoteOutcome =
  | "pendente"
  | "encerrado"
  | "igual"
  | "maior"
  | "menor";

export interface QuoteSummary {
  outcome: QuoteOutcome;
  valorOrcado: number;
  valorConfirmado: number | null;
  diferenca: number;
}
function isCancelled(status: string | null): boolean {
  if (!status) return false;
  return CANCELLED_ORDER_STATUSES.includes(status.trim().toLowerCase());
}
function readQuotedValue(order: PedidoDetalhesDto): number {
  const orcamento = order.valorOrcamento;
  return typeof orcamento === "number" && orcamento > 0
    ? orcamento
    : order.valorTotal;
}
export function summarizeQuote(order: PedidoDetalhesDto): QuoteSummary {
  const valorOrcado = readQuotedValue(order);
  const valorFinal = order.valorFinal;
  const confirmado = typeof valorFinal === "number" && valorFinal > 0;
  if (!confirmado) {
    return {
      outcome: isCancelled(order.status) ? "encerrado" : "pendente",
      valorOrcado,
      valorConfirmado: null,
      diferenca: 0,
    };
  }
  const diferenca = valorFinal - valorOrcado;
  const outcome: QuoteOutcome =
    diferenca === 0 ? "igual" : diferenca > 0 ? "maior" : "menor";
  return { outcome, valorOrcado, valorConfirmado: valorFinal, diferenca };
}
