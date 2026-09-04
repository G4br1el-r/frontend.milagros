"use client";
import { motion, useReducedMotion } from "motion/react";
import { wordmarkReveal } from "../Hero/hero.motion";

const WORDMARK = "MILAGROS";
export function BrandWordmark() {
  const reduceMotion = useReducedMotion();
  return (
    <h1
      className="font-brand flex w-full items-end justify-center text-cream uppercase"
      aria-label={WORDMARK}
    >
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate="show"
        variants={reduceMotion ? undefined : wordmarkReveal}
        className="block px-[0.04em] text-[clamp(2.25rem,11.5vw,7rem)] leading-[1.2] font-medium tracking-[-0.005em] [text-shadow:0_24px_90px_rgba(90,70,42,0.55)] sm:text-[12.5vw] lg:text-[9.5vw] xl:text-[8.75vw]"
      >
        {WORDMARK}
      </motion.span>
    </h1>
  );
}
