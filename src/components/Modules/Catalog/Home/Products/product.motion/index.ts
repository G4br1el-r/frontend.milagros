import type { Transition, Variants } from "motion/react";
import { EASE_OUT_EXPO } from "../../Hero/hero.motion";

export const CARD_SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

export const gridStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const cardLift: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 10px 30px -20px rgba(33,19,10,0.45)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 34px 60px -30px rgba(33,19,10,0.6)",
    transition: CARD_SPRING,
  },
};

export const cardMedia: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

export const cardGlow: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const cardPanel: Variants = {
  rest: { y: "101%" },
  hover: { y: "0%", transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

export const cardCta: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: CARD_SPRING },
  tap: { y: 0, scale: 0.98, transition: CARD_SPRING },
};

export const cardCtaArrow: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: CARD_SPRING },
};
