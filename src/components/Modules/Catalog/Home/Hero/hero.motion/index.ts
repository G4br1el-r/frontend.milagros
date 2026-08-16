import type { Transition, Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const OVERTURE_DELAY = 0.35;

export const heroStage: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: OVERTURE_DELAY,
      staggerChildren: 0.14,
    },
  },
};

export const heroRise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

export const wordmarkStage: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: OVERTURE_DELAY + 0.18,
      staggerChildren: 0.055,
    },
  },
};

export const wordmarkLetter: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.25, ease: EASE_OUT_EXPO },
  },
};

export const hairline: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_OUT_EXPO },
  },
};

export const taglineStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

export const taglineWord: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const CTA_SPRING: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

/**
 * O lift do hover vive num wrapper interno, separado da entrada (`heroRise`):
 * `y` animado por gesto e por entrada no mesmo nó faz o motion travar o `y`
 * inicial, e o botão não sobe junto com o stagger.
 */
export const heroCtaLift: Variants = {
  rest: { y: 0, boxShadow: "0 8px 30px -12px rgba(135,108,67,0.55)" },
  hover: {
    y: -3,
    boxShadow: "0 18px 44px -18px rgba(224,189,140,0.7)",
    transition: CTA_SPRING,
  },
  tap: { y: -1, transition: CTA_SPRING },
};

export const heroCtaArrow: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: CTA_SPRING },
};

export const AMBIENT_DRIFT: Transition = {
  duration: 14,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror",
  ease: "easeInOut",
};
