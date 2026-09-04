import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface MetaProps<T extends ElementType = "span"> {
  as?: T;
  className?: string;
}
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
