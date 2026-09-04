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
export const stepVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springSoft, staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.18 } },
};
export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: springSoft },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};
export const collapseVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: springSoft },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};
export const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springSnappy, staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
