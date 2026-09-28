"use client";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { StaggerItem } from "@/components/motion/ScrollReveal";
import { cardLift } from "../product.motion";

interface ProductCardShellProps {
  children: ReactNode;
}
export function ProductCardShell({ children }: ProductCardShellProps) {
  return (
    <StaggerItem as="article" className="h-full">
      <m.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        variants={cardLift}
        className="group relative isolate flex h-full transform-gpu flex-col overflow-hidden rounded-xl border border-primary/10 bg-white/70 focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-cream"
      >
        {children}
      </m.div>
    </StaggerItem>
  );
}
