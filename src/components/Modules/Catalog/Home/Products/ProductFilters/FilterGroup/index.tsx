"use client";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  badge?: string | null;
  defaultOpen?: boolean;
}
export function FilterGroup({
  title,
  children,
  badge,
  defaultOpen = true,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group/group flex cursor-pointer items-center gap-2 text-left"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
          {title}
        </span>
        {badge && (
          <span className="max-w-[9rem] truncate rounded-full bg-terracotta/10 px-2 py-0.5 text-[10px] font-medium text-terracotta">
            {badge}
          </span>
        )}
        <ChevronDown
          className={cn(
            "ml-auto size-4 shrink-0 text-primary/35 transition-transform duration-200 group-hover/group:text-primary/60",
            !open && "-rotate-90",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {open && children}
    </div>
  );
}
