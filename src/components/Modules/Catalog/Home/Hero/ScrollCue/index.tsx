"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../hero.motion";

export function ScrollCue() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#catalog"
      aria-label="Rolar para o catálogo"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 1.2, ease: EASE_OUT_EXPO }}
      className="group absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-20 mx-auto flex w-fit flex-col items-center gap-2 px-4 py-2 text-cream/85 transition-colors duration-300 hover:text-cream focus-visible:outline-none sm:bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:gap-3"
    >
      <span className="text-[9px] font-medium tracking-[0.35em] uppercase sm:text-[10px] sm:tracking-[0.4em]">
        Deslize
      </span>

      <span className="relative block h-8 w-px overflow-hidden bg-cream/25 sm:h-12">
        <motion.span
          className="absolute inset-x-0 top-0 block h-1/2 bg-linear-to-b from-transparent to-cream"
          animate={reduceMotion ? undefined : { y: ["-100%", "200%"] }}
          transition={{
            duration: 2.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatDelay: 0.4,
          }}
        />
      </span>
    </motion.a>
  );
}
