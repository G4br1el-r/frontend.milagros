"use client";

import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCartCount, useCartStore } from "@/lib/stores/cart";
import { cn } from "@/lib/utils/cn";
import { useScrolled } from "./useScrolled";

export function Header() {
  const { scrolled, hidden } = useScrolled();
  const count = useCartCount();
  const openCart = useCartStore((state) => state.open);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-500",
        scrolled
          ? "border-b border-cream/10 bg-primary-darkest/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-24 sm:px-6">
        <div />

        <Image
          src="/images/hero/milagros-logo.png"
          alt="Milagros"
          width={160}
          height={160}
          loading="eager"
          fetchPriority="high"
          className="h-10 w-auto object-contain sm:h-14"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Carrinho${count > 0 ? ` (${count} itens)` : ""}`}
            className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream/40 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10 focus-visible:ring-2 focus-visible:ring-cream focus-visible:outline-none"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />

            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="count"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-primary-darkest"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
