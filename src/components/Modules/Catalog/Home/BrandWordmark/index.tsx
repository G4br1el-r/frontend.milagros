"use client";

import { ChevronRight, Flame } from "lucide-react";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const line = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function BrandWordmark() {
  return (
    <motion.div
      className="flex w-full flex-col items-start gap-4 pr-6 pl-6 text-left sm:gap-6 sm:pl-12 lg:pl-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="flex items-center gap-2.5 text-gold-light sm:gap-3"
      >
        <Flame className="size-3.5 shrink-0 sm:size-4" strokeWidth={1.75} />
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs sm:tracking-[0.35em] md:text-sm">
          Catálogo Litúrgico
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="font-display max-w-full text-[15.5vw] leading-[0.82] font-medium tracking-wide text-gold-light uppercase [text-shadow:0_2px_0_rgba(0,0,0,0.35),0_10px_60px_rgba(177,89,47,0.4)] sm:text-[10.5vw] lg:text-[8.5vw]"
      >
        Milagros
      </motion.h1>

      <motion.div
        variants={line}
        className="h-px w-16 origin-left bg-gold/60 sm:w-24 lg:w-32"
      />

      <motion.p
        variants={item}
        className="max-w-xs text-base font-normal tracking-wide text-white/85 sm:max-w-lg sm:text-lg lg:text-xl"
      >
        Uma chama para cada devoção, um incenso para cada santo.
      </motion.p>

      <motion.div variants={item} className="mt-1 sm:mt-2">
        <motion.a
          href="#catalogo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-[11px] font-semibold tracking-wide text-primary-dark uppercase transition-colors hover:bg-gold-light sm:px-6 sm:text-xs md:text-sm"
        >
          Conhecer o Catálogo
          <ChevronRight className="size-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
