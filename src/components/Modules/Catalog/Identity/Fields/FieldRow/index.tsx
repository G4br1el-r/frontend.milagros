"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fieldVariants } from "../../identity.motion";
import { FieldError } from "../FieldError";

interface FieldRowProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}
export function FieldRow({
  id,
  label,
  error,
  children,
  className,
}: FieldRowProps) {
  return (
    <motion.div
      variants={fieldVariants}
      className={`flex flex-col gap-1.5 ${className ?? ""}`}
    >
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.08em] text-primary/70 uppercase"
      >
        {label}
      </label>
      {children}
      <FieldError message={error} />
    </motion.div>
  );
}
