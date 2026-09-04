"use client";

import { AnimatePresence, motion } from "motion/react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import { useIdentityGuard } from "@/lib/hooks/use-identity-guard";

interface CartFooterProps {
  total: number;
}

/**
 * Total troca de valor com fade+y curto (mesmo padrão já usado no dígito de
 * quantidade em QuantityStepper) em vez de @number-flow/react: motion/react
 * já está no bundle, e a mudança é uma reação simples de opacity/transform
 * — instalar uma lib nova só para isso não se justifica (seção 2.7).
 */
export function CartFooter({ total }: CartFooterProps) {
  // Finalizar tambem exige identificacao: sem cliente, abre o modal.
  const { checkout } = useIdentityGuard();

  return (
    <div className="flex flex-col gap-4 border-t border-primary/10 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary/60">Subtotal</span>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={total}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block font-sans text-xl font-semibold text-primary tabular-nums"
            >
              {formatPrice(total)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={checkout}
        whileTap={{ scale: 0.985 }}
        className="relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 py-3.5 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90"
      >
        Finalizar compra
      </motion.button>
    </div>
  );
}
