import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface HeadingProps<T extends ElementType = "h2"> {
  as?: T;
  size?: "step-1" | "step-2" | "step-3";
  className?: string;
}
export function Heading<T extends ElementType = "h2">({
  as,
  size = "step-3",
  className,
  ...props
}: HeadingProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeadingProps>) {
  const Tag = as ?? "h2";
  const sizeClass = {
    "step-1": "text-[length:var(--text-step-1)]",
    "step-2": "text-[length:var(--text-step-2)]",
    "step-3": "text-[length:var(--text-step-3)]",
  }[size];
  return (
    <Tag
      className={cn(
        "font-serif font-medium text-linho leading-[1.15] text-balance",
        sizeClass,
        className,
      )}
      {...props}
    />
  );
}
