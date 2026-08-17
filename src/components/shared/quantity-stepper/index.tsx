"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  onRemove: () => void;
  min?: number;
  max?: number;
  className?: string;
}

const NUMERIC_PATTERN = /^\d*$/;

export function QuantityStepper({
  quantity,
  onChange,
  onRemove,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [pulseDelete, setPulseDelete] = useState(false);

  const clamp = (value: number) => Math.min(max, Math.max(min, value));

  const commit = (value: number) => {
    setDraft(null);
    setIsFocused(false);
    onChange(clamp(value));
  };

  const bump = (delta: number) => onChange(clamp(quantity + delta));

  const handleDecrement = () => {
    if (quantity <= min) {
      setPulseDelete(true);
      onRemove();
      return;
    }
    bump(-1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (NUMERIC_PATTERN.test(value)) setDraft(value);
  };

  const handleBlur = () => {
    if (draft === null || draft === "") {
      commit(min);
      return;
    }
    commit(Number(draft));
  };

  const isAtMin = quantity <= min;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-primary/12 bg-white px-1 py-1",
        className,
      )}
    >
      <motion.button
        type="button"
        onClick={handleDecrement}
        animate={pulseDelete ? { scale: [1, 0.85, 1] } : { scale: 1 }}
        onAnimationComplete={() => setPulseDelete(false)}
        aria-label={isAtMin ? "Remover item" : "Diminuir quantidade"}
        className={cn(
          "flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
          isAtMin
            ? "text-terracotta hover:bg-terracotta/10"
            : "text-primary/70 hover:bg-primary/8 hover:text-primary",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isAtMin ? (
            <motion.span
              key="trash"
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <Trash2 className="size-3.5" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="minus"
              initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <Minus className="size-3.5" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="relative flex h-7 w-9 items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isFocused && (
            <motion.span
              key={quantity}
              aria-hidden="true"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute text-sm font-semibold text-primary tabular-nums"
            >
              {quantity}
            </motion.span>
          )}
        </AnimatePresence>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft ?? quantity}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setDraft(String(quantity));
          }}
          onBlur={handleBlur}
          className={cn(
            "absolute w-full bg-transparent text-center text-sm font-semibold text-primary tabular-nums outline-none",
            !isFocused && "opacity-0",
          )}
          aria-label="Quantidade"
        />
      </div>

      <motion.button
        type="button"
        onClick={() => bump(1)}
        whileTap={{ scale: 0.85 }}
        disabled={quantity >= max}
        aria-label="Aumentar quantidade"
        className="flex size-7 cursor-pointer items-center justify-center rounded-full text-primary/70 transition-colors duration-200 hover:bg-primary/8 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
      >
        <Plus className="size-3.5" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
