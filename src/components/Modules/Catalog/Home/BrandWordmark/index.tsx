"use client";

import { motion, useReducedMotion } from "motion/react";
import { wordmarkLetter, wordmarkStage } from "../Hero/hero.motion";

const WORDMARK = "MILAGROS";

export function BrandWordmark() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      variants={wordmarkStage}
      className="font-display flex w-full items-end justify-center text-cream uppercase"
      aria-label={WORDMARK}
    >
      {WORDMARK.split("").map((char, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static glyph sequence
          key={`${char}-${index}`}
          aria-hidden="true"
          className="block overflow-hidden pb-[0.08em]"
        >
          <motion.span
            variants={reduceMotion ? undefined : wordmarkLetter}
            className="block text-[clamp(2.25rem,11.5vw,7rem)] leading-[0.86] font-medium tracking-[-0.005em] [text-shadow:0_24px_90px_rgba(90,70,42,0.55)] sm:text-[12.5vw] lg:text-[9.5vw] xl:text-[8.75vw]"
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
