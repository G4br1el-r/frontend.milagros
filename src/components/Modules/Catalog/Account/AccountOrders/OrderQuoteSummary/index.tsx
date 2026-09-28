import { ArrowDown, ArrowUp, Check, Clock } from "lucide-react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import {
  QUOTE_ADJUSTED_DOWN_LABEL,
  QUOTE_ADJUSTED_UP_LABEL,
  QUOTE_CONFIRMED_LABEL,
  QUOTE_PENDING_LABEL,
  QUOTE_SENT_LABEL,
  QUOTE_UNCHANGED_LABEL,
} from "@/lib/checkout/checkout.constants";
import type { QuoteSummary } from "@/lib/checkout/quote-status";
import { cn } from "@/lib/utils/cn";

interface OrderQuoteSummaryProps {
  quote: QuoteSummary;
}
export function OrderQuoteSummary({ quote }: OrderQuoteSummaryProps) {
  const pendente = quote.outcome === "pendente";
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-primary/10 bg-cream/60 p-3.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 text-primary/60">
          <span
            aria-hidden="true"
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary/60"
          >
            1
          </span>
          {QUOTE_SENT_LABEL}
        </span>
        <span
          className={cn(
            "shrink-0 font-sans tabular-nums",
            pendente ? "font-semibold text-primary" : "text-primary/60",
          )}
        >
          {formatPrice(quote.valorOrcado)}
        </span>
      </div>
      <div className="ml-2.5 h-3 w-px bg-primary/15" aria-hidden="true" />
      {pendente ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-primary/50">
            <Clock className="size-4 shrink-0" strokeWidth={2} />
            {QUOTE_PENDING_LABEL}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-medium text-primary">
              <span
                aria-hidden="true"
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              {QUOTE_CONFIRMED_LABEL}
            </span>
            <span className="shrink-0 font-sans text-base font-semibold tabular-nums text-primary">
              {formatPrice(quote.valorConfirmado ?? 0)}
            </span>
          </div>
          <QuoteDelta quote={quote} />
        </div>
      )}
    </div>
  );
}
function QuoteDelta({ quote }: OrderQuoteSummaryProps) {
  if (quote.outcome === "igual") {
    return (
      <span className="pl-7 text-xs text-primary/45">
        {QUOTE_UNCHANGED_LABEL}
      </span>
    );
  }
  const subiu = quote.outcome === "maior";
  const Icon = subiu ? ArrowUp : ArrowDown;
  return (
    <span
      className={cn(
        "flex items-center gap-1 pl-7 text-xs font-medium",
        subiu ? "text-terracotta" : "text-emerald-700",
      )}
    >
      <Icon className="size-3 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      {subiu ? QUOTE_ADJUSTED_UP_LABEL : QUOTE_ADJUSTED_DOWN_LABEL}
      {" · "}
      {formatPrice(Math.abs(quote.diferenca))}
    </span>
  );
}
