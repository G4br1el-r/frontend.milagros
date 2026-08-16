"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cardPanel } from "../product.motion";

export function ProductPanel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={cardPanel}
      className="absolute inset-x-0 bottom-0 border-t border-cream/15 bg-primary-darkest/85 px-5 py-3.5 backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
}
