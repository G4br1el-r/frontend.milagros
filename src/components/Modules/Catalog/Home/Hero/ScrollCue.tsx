"use client";

import { motion } from "motion/react";

export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-gold-light"
    >
      <div className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-full bg-primary-dark/40 blur-xl" />

      <motion.svg
        width="20"
        height="34"
        viewBox="0 0 20 34"
        fill="none"
        className="overflow-visible drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
        aria-hidden="true"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="scroll-cue-smoke" x1="0" y1="34" x2="0" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M10 33c-2.8-2.6-4.2-4.9-2.6-7 1.6-2.1 4-1.7 2.6-4.4-1.4-2.7-4.3-3-2.9-5.9 1.4-2.9 4.3-2.4 3.1-5.6C9 7 6.6 6.7 8.2 3.7 9 1 9.6 1 10 0"
          stroke="url(#scroll-cue-smoke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>

      <motion.div
        className="h-8 w-px origin-top bg-linear-to-b from-gold-light/70 to-transparent"
        animate={{ scaleY: [1, 0.4, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="text-[10px] font-medium tracking-[0.35em] text-gold-light/80 uppercase">
        Deslize
      </span>
    </motion.div>
  );
}
