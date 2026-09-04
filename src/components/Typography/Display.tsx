import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface DisplayProps<T extends ElementType = "h1"> {
  as?: T;
  size?: "step-4" | "step-5";
  className?: string;
}
export function Display<T extends ElementType = "h1">({
  as,
  size = "step-4",
  className,
  ...props
}: DisplayProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof DisplayProps>) {
  const Tag = as ?? "h1";
  return (
    <Tag
      className={cn(
        "font-serif font-medium text-linho leading-[1.05] text-balance",
        size === "step-5"
          ? "text-[length:var(--text-step-5)]"
          : "text-[length:var(--text-step-4)]",
        className,
      )}
      {...props}
    />
  );
}
