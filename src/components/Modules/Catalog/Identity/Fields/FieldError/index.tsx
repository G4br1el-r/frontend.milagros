"use client";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { errorVariants } from "../../identity.motion";

interface FieldErrorProps {
  id?: string;
  message?: string;
}
export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message && (
        <m.div
          key={message}
          initial={{ gridTemplateRows: "0fr" }}
          animate={{ gridTemplateRows: "1fr" }}
          exit={{ gridTemplateRows: "0fr" }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="grid"
        >
          <m.p
            id={id}
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            className="min-h-0 overflow-hidden text-[11px] font-medium text-red-600"
          >
            {message}
          </m.p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
