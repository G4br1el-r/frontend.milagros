"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FilterCheckboxProps {
  label: string;
  count: number;
  defaultChecked?: boolean;
}

export function FilterCheckbox({
  label,
  count,
  defaultChecked,
}: FilterCheckboxProps) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="group/filter flex cursor-pointer items-center gap-3 py-1.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-200",
          checked
            ? "border-terracotta bg-terracotta"
            : "border-primary/25 bg-white group-hover/filter:border-primary/45",
        )}
      >
        <Check
          className={cn(
            "size-3 text-cream transition-opacity duration-150",
            checked ? "opacity-100" : "opacity-0",
          )}
          strokeWidth={3}
        />
      </span>

      <span
        className={cn(
          "flex-1 text-sm transition-colors duration-200",
          checked
            ? "font-medium text-primary"
            : "text-primary/70 group-hover/filter:text-primary",
        )}
      >
        {label}
      </span>

      <span className="text-xs text-primary/40 tabular-nums">{count}</span>
    </label>
  );
}
