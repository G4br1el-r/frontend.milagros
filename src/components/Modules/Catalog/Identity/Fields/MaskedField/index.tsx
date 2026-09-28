"use client";
import { IMaskInput } from "react-imask";
import { getFieldErrorId } from "../field-error-id";
import { fieldInputClassName } from "../field-styles";

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
      aria-describedby={invalid ? getFieldErrorId(id) : undefined}
      className={fieldInputClassName(invalid)}
    />
  );
}
