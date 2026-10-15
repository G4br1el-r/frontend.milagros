"use client";
import { cn } from "@/lib/utils/cn";
import { formatPrice, type ProductVariant } from "../../product.types";

interface ProductVariantPickerProps {
  label: string;
  variants: ProductVariant[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
}
export function ProductVariantPicker({
  label,
  variants,
  selectedId,
  onSelect,
}: ProductVariantPickerProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[10px] font-medium tracking-[0.2em] text-primary-dark/80 uppercase">
        {label}
      </legend>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-2">
        {variants.map((variant) => {
          const selected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant.id)}
              aria-pressed={selected}
              className={cn(
                "flex min-h-11 w-full cursor-pointer flex-col items-start justify-center gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none",
                selected
                  ? "border-gold bg-gold/10"
                  : "border-primary/12 hover:border-primary/25 hover:bg-primary/[0.03]",
              )}
            >
              <span className="text-sm leading-snug font-medium text-primary">
                {variant.name}
              </span>
              <span className="font-sans text-xs tabular-nums text-primary/65">
                {formatPrice(variant.price)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
