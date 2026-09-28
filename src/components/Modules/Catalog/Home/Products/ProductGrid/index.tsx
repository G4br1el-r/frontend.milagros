"use client";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import {
  PRODUCT_GRID_STAGGER_SECONDS,
  PRODUCT_GRID_VARIANTS,
} from "./product-grid.motion";

interface ProductGridProps {
  children: ReactNode;
}

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <m.div
      variants={PRODUCT_GRID_VARIANTS}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: PRODUCT_GRID_STAGGER_SECONDS }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5"
    >
      {children}
    </m.div>
  );
}
