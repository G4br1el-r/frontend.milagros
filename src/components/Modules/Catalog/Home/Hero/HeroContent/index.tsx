"use client";

import { Flame } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BrandWordmark } from "../../BrandWordmark";
import { HeroCta } from "../HeroCta";
import {
  AMBIENT_DRIFT,
  hairline,
  heroRise,
  heroStage,
  taglineStage,
  taglineWord,
} from "../hero.motion";

const TAGLINE = "Uma chama para cada devoção, um incenso para cada santo.";

export function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={heroStage}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-208 flex-col items-center gap-6 text-center sm:gap-7"
    >
      <motion.div
        variants={heroRise}
        className="flex items-center gap-3 rounded-full border border-cream/30 bg-primary-dark/40 px-4 py-2 backdrop-blur-sm"
      >
        <motion.span
          animate={reduceMotion ? undefined : { opacity: [1, 0.55, 1] }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex text-cream"
        >
          <Flame className="size-3.5 shrink-0" strokeWidth={2} />
        </motion.span>
        <span className="text-[10px] font-medium tracking-[0.3em] text-cream uppercase sm:text-[11px] sm:tracking-[0.38em]">
          Catálogo Litúrgico
        </span>
      </motion.div>

      <motion.div
        className="w-full"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={AMBIENT_DRIFT}
      >
        <BrandWordmark />
      </motion.div>

      <motion.div
        variants={heroRise}
        className="flex items-center justify-center gap-4 sm:gap-5"
      >
        <motion.span
          variants={hairline}
          className="h-px w-14 origin-right bg-linear-to-r from-transparent to-cream/70 sm:w-24 lg:w-32"
        />
        <span className="font-display shrink-0 text-[10px] tracking-[0.3em] text-cream/85 italic sm:text-xs">
          in hoc signo vinces
        </span>
        <motion.span
          variants={hairline}
          className="h-px w-14 origin-left bg-linear-to-l from-transparent to-cream/70 sm:w-24 lg:w-32"
        />
      </motion.div>

      <motion.p
        variants={taglineStage}
        className="mx-auto max-w-md text-balance text-base leading-relaxed font-light tracking-wide text-cream sm:max-w-xl sm:text-lg lg:text-xl"
      >
        {TAGLINE.split(" ").map((word, index) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: static word sequence
            key={`${word}-${index}`}
            variants={reduceMotion ? undefined : taglineWord}
            className="inline-block whitespace-pre"
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.p>

      <HeroCta />
    </motion.div>
  );
}
