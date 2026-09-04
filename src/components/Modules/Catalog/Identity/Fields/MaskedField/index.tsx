"use client";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils/cn";

interface DynamicMasked {
  value: string;
  compiledMasks: unknown[];
}
export type MaskDispatch = (
  appended: string,
  dynamicMasked: DynamicMasked,
) => unknown;
export interface MaskedFieldProps {
  id: string;
  mask: string | Array<{ mask: string }>;
  value: string;
  onAccept: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  autoComplete?: string;
  disabled?: boolean;
  invalid?: boolean;
  dispatch?: MaskDispatch;
}
export function MaskedField({
  id,
  mask,
  value,
  onAccept,
  onBlur,
  placeholder,
  inputMode = "numeric",
  autoComplete,
  disabled,
  invalid,
  dispatch,
}: MaskedFieldProps) {
  return (
    <IMaskInput
      id={id}
      {...({ mask, dispatch } as Record<string, unknown>)}
      value={value}
      unmask={false}
      lazy
      overwrite={false}
      onAccept={(next) => onAccept(next as string)}
      onBlur={onBlur}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-primary transition-colors duration-200 outline-none placeholder:text-primary/35",
        "focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25",
        "disabled:cursor-not-allowed disabled:bg-primary/5 disabled:text-primary/45",
        invalid
          ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200"
          : "border-primary/15",
      )}
    />
  );
}
