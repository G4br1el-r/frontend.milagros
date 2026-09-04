"use client";
import { Check } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

interface CategoryOptionProps {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}
export function CategoryOption({
  label,
  count,
  selected,
  onSelect,
}: CategoryOptionProps) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="group/filter flex cursor-pointer items-center gap-3 py-1.5"
    >
      <input
        id={id}
        type="radio"
        name="categoria"
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-200",
          selected
            ? "border-terracotta bg-terracotta"
            : "border-primary/25 bg-white group-hover/filter:border-primary/45",
        )}
      >
        <Check
          className={cn(
            "size-3 text-cream transition-opacity duration-150",
            selected ? "opacity-100" : "opacity-0",
          )}
          strokeWidth={3}
        />
      </span>
      <span
        className={cn(
          "flex-1 text-sm transition-colors duration-200",
          selected
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
