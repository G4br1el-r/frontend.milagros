import type { ReactNode } from "react";

interface ProductGridProps {
  children: ReactNode;
}

/**
 * Sem entrada animada por scroll (banida na seção 2.7/3). Server Component:
 * sem "use client", sem motion/react, um componente a menos atravessando
 * a fronteira.
 */
export function ProductGrid({ children }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5">
      {children}
    </div>
  );
}
