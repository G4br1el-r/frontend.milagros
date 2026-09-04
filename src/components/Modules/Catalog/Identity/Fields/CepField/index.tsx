"use client";

import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CEP_LENGTH } from "@/lib/customer/customer.constants";
import { MaskedField } from "../MaskedField";

interface CepFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

/** Dispara a busca assim que o CEP fica completo — sem botao extra. */
export function CepField({
  id = "cep",
  value,
  onChange,
  onComplete,
  isLoading,
  disabled,
  invalid,
}: CepFieldProps) {
  return (
    <div className="relative">
      <MaskedField
        id={id}
        mask="00000-000"
        value={value}
        onAccept={(next) => {
          onChange(next);
          if (next.replace(/\D/g, "").length === CEP_LENGTH) onComplete(next);
        }}
        placeholder="00000-000"
        autoComplete="postal-code"
        disabled={disabled || isLoading}
        invalid={invalid}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-primary/50"
          >
            <Loader2 className="size-4 animate-spin" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
