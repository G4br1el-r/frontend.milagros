import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface ContainerProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
}

/**
 * Container único do site — seção 2.6. max-width 1440px e padding-inline
 * fluido, consumidos via var() das custom properties de tokens.css
 * (--layout-container-max/--layout-container-padding não são namespace de
 * utility do Tailwind, então não viram classe automática).
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth: "var(--layout-container-max)",
        paddingInline: "var(--layout-container-padding)",
      }}
      {...props}
    />
  );
}
