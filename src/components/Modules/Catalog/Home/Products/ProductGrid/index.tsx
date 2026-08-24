"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { gridStage } from "../product.motion";

export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={gridStage}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
    >
      {children}
    </motion.div>
  );
}
