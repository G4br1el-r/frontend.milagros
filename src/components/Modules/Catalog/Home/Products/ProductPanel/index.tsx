"use client";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { cardPanel } from "../product.motion";
export function ProductPanel({ children }: { children: ReactNode }) {
  return (
    <m.div
      variants={cardPanel}
      className="absolute inset-x-0 bottom-0 border-t border-cream/15 bg-primary-darkest/85 px-5 py-3.5"
    >
      {children}
    </m.div>
  );
}
