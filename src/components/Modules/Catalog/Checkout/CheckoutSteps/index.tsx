"use client";
import { motion } from "motion/react";
import {
  CHECKOUT_STEP_LABELS,
  CHECKOUT_STEPS,
  type CheckoutStep,
} from "@/lib/checkout/checkout.constants";
import { cn } from "@/lib/utils/cn";
import { springSoft } from "../checkout.motion";

interface CheckoutStepsProps {
  current: CheckoutStep;
}
export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = CHECKOUT_STEPS.indexOf(current);
  return (
    <ol className="flex items-center gap-2">
      {CHECKOUT_STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 flex-col gap-1.5">
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300",
                  isCurrent
                    ? "text-primary"
                    : isDone
                      ? "text-primary/55"
                      : "text-primary/30",
                )}
              >
                {CHECKOUT_STEP_LABELS[step]}
              </span>
              <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-primary/10">
                <motion.span
                  initial={false}
                  animate={{ scaleX: isDone || isCurrent ? 1 : 0 }}
                  transition={springSoft}
                  style={{ originX: 0 }}
                  className="absolute inset-0 rounded-full bg-gold"
                />
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
