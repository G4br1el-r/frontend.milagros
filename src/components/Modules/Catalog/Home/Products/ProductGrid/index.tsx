import type { ReactNode } from "react";
import { StaggerReveal } from "@/components/motion/ScrollReveal";

interface ProductGridProps {
  children: ReactNode;
}

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <StaggerReveal
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5"
      staggerChildren={0.05}
    >
      {children}
    </StaggerReveal>
  );
}
