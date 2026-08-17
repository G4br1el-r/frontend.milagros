"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cardEnter, cardLift } from "../product.motion";

interface ProductCardShellProps {
  children: ReactNode;
}

export function ProductCardShell({ children }: ProductCardShellProps) {
  return (
    <motion.article variants={cardEnter} className="h-full">
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        variants={cardLift}
        className="group relative isolate flex h-full transform-gpu flex-col overflow-hidden rounded-xl border border-primary/10 bg-white/70 backdrop-blur-sm focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-cream"
      >
        {children}
      </motion.div>
    </motion.article>
  );
}
