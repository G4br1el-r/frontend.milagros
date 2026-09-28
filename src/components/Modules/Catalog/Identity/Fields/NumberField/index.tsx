"use client";
import { Check } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ADDRESS_WITHOUT_NUMBER } from "@/lib/customer/customer.constants";
import { springSnappy } from "../../identity.motion";
import { getFieldErrorId } from "../field-error-id";
import { fieldInputClassName } from "../field-styles";

interface NumberFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}
export function NumberField({
  id = "numero",
  value,
  onChange,
  disabled,
  invalid,
}: NumberFieldProps) {
  const withoutNumber = value === ADDRESS_WITHOUT_NUMBER;
  const checkboxId = `${id}-sem-numero`;
  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={withoutNumber ? ADDRESS_WITHOUT_NUMBER : value}
        onChange={(event) =>
          onChange(event.target.value.replace(/\D/g, "").slice(0, 10))
        }
        placeholder="Número"
        autoComplete="address-line2"
        disabled={disabled || withoutNumber}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? getFieldErrorId(id) : undefined}
        className={fieldInputClassName(invalid)}
      />
      <label
        htmlFor={checkboxId}
        className="group flex w-fit cursor-pointer items-center gap-2 text-xs text-primary/70 transition-colors duration-200 hover:text-primary"
      >
        <span className="relative flex size-4 items-center justify-center">
          <input
            id={checkboxId}
            type="checkbox"
            checked={withoutNumber}
            onChange={() =>
              onChange(withoutNumber ? "" : ADDRESS_WITHOUT_NUMBER)
            }
            disabled={disabled}
            className="peer absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <m.span
            animate={{
              backgroundColor: withoutNumber
                ? "var(--color-gold)"
                : "#ffffff00",
              borderColor: withoutNumber
                ? "var(--color-gold)"
                : "color-mix(in oklab, var(--color-primary) 25%, transparent)",
            }}
            transition={springSnappy}
            className="pointer-events-none flex size-4 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-gold/40"
          >
            <AnimatePresence>
              {withoutNumber && (
                <m.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={springSnappy}
                >
                  <Check
                    className="size-3 text-primary-darkest"
                    strokeWidth={3}
                  />
                </m.span>
              )}
            </AnimatePresence>
          </m.span>
        </span>
        Sem número
      </label>
    </div>
  );
}
