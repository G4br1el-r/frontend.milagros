import type { Transition, Variants } from "motion/react";
export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.6,
};
export const modalContentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springSoft, staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16 } },
};
export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: springSoft },
  exit: { opacity: 0, y: -6, transition: { duration: 0.14 } },
};
export const errorVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: springSnappy },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14 } },
};
export const reducedMotionSafe = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;
