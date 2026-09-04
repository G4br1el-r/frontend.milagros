import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface BodyProps<T extends ElementType = "p"> {
  as?: T;
  size?: "step-neg-1" | "step-0";
  variant?: "prose" | "ui";
  className?: string;
}
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
