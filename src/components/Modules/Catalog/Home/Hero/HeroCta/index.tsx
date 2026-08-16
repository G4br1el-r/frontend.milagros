"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { heroCtaArrow, heroCtaLift, heroRise } from "../hero.motion";

export function HeroCta() {
  return (
    <motion.div variants={heroRise} className="inline-flex">
      <motion.a
        href="#catalog"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap="tap"
        variants={heroCtaLift}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-7 py-3.5 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark focus-visible:outline-none sm:px-8 sm:py-4 sm:text-xs"
      >
        <span className="relative z-10">Conhecer o Catálogo</span>
        <motion.span
          aria-hidden="true"
          variants={heroCtaArrow}
          className="relative z-10 inline-flex"
        >
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </motion.span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-2/3 skew-x-[-20deg] bg-white/25 blur-xl transition-[left] duration-1200 ease-in-out group-hover:left-[160%]"
        />
      </motion.a>
    </motion.div>
  );
}
