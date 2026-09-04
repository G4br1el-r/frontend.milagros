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

/** Conteudo do modal: entra com leve subida, escalonando os filhos. */
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

/**
 * Mensagem de erro do campo. A seção 2.7 proíbe animar height — o wrapper
 * (FieldError) usa grid-template-rows: 0fr → 1fr; aqui só opacity e o leve
 * y de entrada, que são as propriedades permitidas.
 */
export const errorVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: springSnappy },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14 } },
};

/** Respeita quem pediu menos movimento no sistema. */
export const reducedMotionSafe = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;
