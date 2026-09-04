import { CalendarClock } from "lucide-react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import type { AccountMetrics as AccountMetricsData } from "@/lib/account/account.metrics";

interface AccountMetricsProps {
  metrics: AccountMetricsData;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function AccountMetrics({ metrics }: AccountMetricsProps) {
  const secondary = [
    { label: "Pedidos", value: String(metrics.totalPedidos) },
    { label: "Itens comprados", value: String(metrics.totalItens) },
    { label: "Ticket médio", value: formatPrice(metrics.ticketMedio) },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-6 border-t border-gold/50 pt-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-primary/55 uppercase">
            Total investido na devoção
          </span>
          <span className="font-sans text-5xl font-semibold tabular-nums text-primary sm:text-6xl">
            {formatPrice(metrics.totalGasto)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {secondary.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold tracking-[0.1em] text-primary/50 uppercase">
                {item.label}
              </span>
              <span className="font-sans text-xl font-semibold tabular-nums text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {metrics.proximaParcela && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-white p-5 text-center">
          <div className="flex items-center gap-2 text-primary/60">
            <CalendarClock className="size-4" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase">
              Próximo vencimento
            </span>
          </div>

          <span className="font-display text-lg text-primary">
            {formatDate(metrics.proximaParcela.dataVencimento)}
          </span>

          <span className="font-sans text-3xl font-semibold tabular-nums text-primary">
            {formatPrice(metrics.proximaParcela.valor)}
          </span>

          {metrics.proximaParcela.numeroPedidoOmie && (
            <span className="text-xs text-primary/55">
              Pedido {metrics.proximaParcela.numeroPedidoOmie}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
