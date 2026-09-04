import type { Transition, Variants } from "motion/react";
import { EASE_OUT_EXPO } from "../../../Hero/hero.motion";
export const PAGE_SPRING: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 0.85,
};
export const stage: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.08, staggerChildren: 0.09 },
  },
};
export const rise: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};
export const riseSoft: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
export const revealMedia: Variants = {
  hidden: { opacity: 0, x: -24, scale: 0.97 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};
export const hairline: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO },
  },
};
export const specStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
export const specRow: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};
export const ctaLift: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: PAGE_SPRING },
  tap: { y: 0, scale: 0.98, transition: PAGE_SPRING },
};
export const AMBIENT_GLOW: Transition = {
  duration: 12,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror",
  ease: "easeInOut",
};
export const DETAIL_VIEWPORT = { once: true, margin: "-60px" } as const;
