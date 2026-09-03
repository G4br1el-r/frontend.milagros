"use client";

import { AnimatePresence, motion } from "motion/react";
import { errorVariants } from "../../identity.motion";

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message && (
        <motion.p
          key={message}
          variants={errorVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="alert"
          className="overflow-hidden text-[11px] font-medium text-red-600"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
