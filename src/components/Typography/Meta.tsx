import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface MetaProps<T extends ElementType = "span"> {
  as?: T;
  className?: string;
}

/**
 * Metadado, legenda, hierarquia auxiliar — a peça que a auditoria encontrou
 * como eyebrow em caixa alta com tracking inflado (13 valores distintos).
 * A seção 2.5 proíbe uppercase em label: hierarquia menor usa small caps
 * REAIS da Cardo (font-variant-caps, não text-transform), sem tracking
 * artificial para compensar.
 */
export function Meta<T extends ElementType = "span">({
  as,
  className,
  ...props
}: MetaProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof MetaProps>) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "font-serif text-[length:var(--text-step-neg-1)] text-fumaca [font-variant-caps:small-caps]",
        className,
      )}
      {...props}
    />
  );
}
