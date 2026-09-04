import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface LatinProps<T extends ElementType = "span"> {
  as?: T;
  className?: string;
}
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
