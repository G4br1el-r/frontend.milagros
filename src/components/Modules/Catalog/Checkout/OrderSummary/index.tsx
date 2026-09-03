"use client";

import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";

interface OrderSummaryProps {
  subtotal: number;
  total: number;
  desconto?: number;
  parcelaLabel?: string | null;
}

export function OrderSummary({
  subtotal,
  total,
  desconto = 0,
  parcelaLabel,
}: OrderSummaryProps) {
  return (
    <dl className="flex flex-col gap-2 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-primary/60">Subtotal</dt>
        <dd className="text-primary">{formatPrice(subtotal)}</dd>
      </div>

      {desconto > 0 && (
        <div className="flex items-center justify-between">
          <dt className="text-primary/60">Desconto</dt>
          <dd className="text-emerald-700">− {formatPrice(desconto)}</dd>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-primary/10 pt-2">
        <dt className="font-medium text-primary">Total</dt>
        <dd className="font-display text-xl text-primary">
          {formatPrice(total)}
        </dd>
      </div>

      {parcelaLabel && (
        <p className="text-right text-xs text-primary/55">{parcelaLabel}</p>
      )}
    </dl>
  );
}
