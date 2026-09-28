"use client";
import { getFieldErrorId } from "../field-error-id";
import { fieldInputClassName } from "../field-styles";

interface TextFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  disabled?: boolean;
  invalid?: boolean;
  maxLength?: number;
  uppercase?: boolean;
}
export function TextField({
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  autoComplete,
  disabled,
  invalid,
  maxLength,
  uppercase,
}: TextFieldProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) =>
        onChange(
          uppercase ? event.target.value.toUpperCase() : event.target.value,
        )
      }
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      maxLength={maxLength}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? getFieldErrorId(id) : undefined}
      className={fieldInputClassName(invalid)}
    />
  );
}
