"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { CART_ITEMS_COUNT } from "@/lib/utils/constants";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-0 z-30 w-full"
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/70 to-transparent" />

      <div className="relative mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:h-24">
        <div />

        <Image
          src="/images/hero/milagros-logo.png"
          alt="Milagros"
          width={160}
          height={160}
          priority
          className="h-12 w-auto object-contain sm:h-14"
        />

        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Carrinho"
            className="relative flex size-10 items-center justify-center rounded-full border border-gold-light/40 text-gold-light transition-colors hover:border-gold-light hover:text-gold-light/80"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />

            {CART_ITEMS_COUNT > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary-dark">
                {CART_ITEMS_COUNT}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
