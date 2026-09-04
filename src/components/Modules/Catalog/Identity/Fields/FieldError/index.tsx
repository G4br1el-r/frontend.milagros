"use client";

import { AnimatePresence, motion } from "motion/react";
import { errorVariants } from "../../identity.motion";

interface FieldErrorProps {
  message?: string;
}

/**
 * Wrapper externo anima grid-template-rows (a via aprovada pela seção 2.7
 * para colapsar altura sem animar `height`); o conteúdo interno
 * (errorVariants) só anima opacity/y.
 */
export function FieldError({ message }: FieldErrorProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ gridTemplateRows: "0fr" }}
          animate={{ gridTemplateRows: "1fr" }}
          exit={{ gridTemplateRows: "0fr" }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="grid"
        >
          <motion.p
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            className="min-h-0 overflow-hidden text-[11px] font-medium text-red-600"
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
