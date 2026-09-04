import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface LatinProps<T extends ElementType = "span"> {
  as?: T;
  className?: string;
}

/**
 * Frases em latim (duc in altum, ad maiorem Dei gloriam) — assinatura
 * gráfica do site, não legenda. Cardo itálico com small caps reais via
 * font-variant-caps (não CSS text-transform, que não existe em itálico
 * de verdade — a Cardo tem os glifos de small caps desenhados).
 */
export function Latin<T extends ElementType = "span">({
  as,
  className,
  ...props
}: LatinProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof LatinProps>) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "font-serif text-[length:var(--text-step-neg-1)] text-ouro italic [font-variant-caps:small-caps]",
        className,
      )}
      {...props}
    />
  );
}
