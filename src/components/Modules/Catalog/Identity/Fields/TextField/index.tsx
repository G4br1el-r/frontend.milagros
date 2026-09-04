"use client";
import { cn } from "@/lib/utils/cn";

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
