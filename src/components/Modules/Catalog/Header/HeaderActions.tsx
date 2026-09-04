"use client";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CustomerMenu } from "@/components/Modules/Catalog/Identity";
import { useCartCount, useCartStore } from "@/lib/stores/cart";
import { MobileMenu } from "./MobileMenu";
export function HeaderActions() {
  const count = useCartCount();
  const openCart = useCartStore((state) => state.open);
  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      <CustomerMenu />
      <button
        type="button"
        onClick={openCart}
        aria-label={
          count && count > 0 ? `Carrinho (${count} itens)` : "Carrinho"
        }
        className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-linho/20 text-linho transition-colors duration-300 hover:border-ouro hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
      >
        <ShoppingCart className="size-5" strokeWidth={1.75} />
        <AnimatePresence>
          {count !== null && count > 0 && (
            <motion.span
              key="count"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-brasa text-[length:var(--text-step-neg-1)] font-bold text-linho"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <MobileMenu />
    </div>
  );
}
