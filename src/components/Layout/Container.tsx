import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface ContainerProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
}
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
