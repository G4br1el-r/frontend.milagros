"use client";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import {
  EASE_OUT_EXPO,
  SCROLL_CUE_LOOP,
  SCROLL_CUE_REST,
} from "../hero.motion";
import { useHeroVisible } from "../use-hero-visible";
export function ScrollCue() {
  const reduceMotion = useReducedMotion();
  const heroVisible = useHeroVisible();
  return (
    <m.a
      href="#catalog"
      aria-label="Rolar para o catálogo"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 1.2, ease: EASE_OUT_EXPO }}
      className="group absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-20 mx-auto flex w-fit cursor-pointer flex-col items-center gap-2 px-4 py-2 text-cream/85 transition-colors duration-300 hover:text-cream focus-visible:outline-none sm:bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:gap-3"
    >
      <span className="text-[9px] font-medium tracking-[0.35em] uppercase sm:text-[10px] sm:tracking-[0.4em]">
        Deslize
      </span>
      <span className="relative block h-8 w-px overflow-hidden bg-cream/25 sm:h-12">
        <m.span
          className="absolute inset-x-0 top-0 block h-1/2 bg-linear-to-b from-transparent to-cream"
          animate={
            reduceMotion
              ? undefined
              : heroVisible
                ? SCROLL_CUE_LOOP
                : SCROLL_CUE_REST
          }
        />
      </span>
    </m.a>
  );
}
