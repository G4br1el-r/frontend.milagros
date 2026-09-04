import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface BodyProps<T extends ElementType = "p"> {
  as?: T;
  /** step-0 (padrão, ~17-18px) ou step--1 (~13-14px, legenda/apoio). Nunca abaixo disso — piso de 12px da seção 2.5. */
  size?: "step-neg-1" | "step-0";
  /** Corpo em prosa (Cardo, medida 62ch) por padrão. "ui" usa Inter Tight, sem medida máxima — para texto de interface. */
  variant?: "prose" | "ui";
  className?: string;
}

/**
 * Parágrafo corrido. line-height 1.65 e max-width 62ch são a seção 2.5 —
 * não são estilo, são o que torna um bloco de texto em Cardo legível.
 */
export function Body<T extends ElementType = "p">({
  as,
  size = "step-0",
  variant = "prose",
  className,
  ...props
}: BodyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof BodyProps>) {
  const Tag = as ?? "p";
  const sizeClass =
    size === "step-neg-1"
      ? "text-[length:var(--text-step-neg-1)]"
      : "text-[length:var(--text-step-0)]";

  return (
    <Tag
      className={cn(
        "text-linho/70 text-pretty",
        variant === "prose"
          ? "max-w-[62ch] font-serif leading-[1.65]"
          : "font-sans leading-normal",
        sizeClass,
        className,
      )}
      {...props}
    />
  );
}
