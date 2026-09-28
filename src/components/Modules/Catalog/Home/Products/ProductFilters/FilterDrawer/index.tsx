"use client";
import { SlidersHorizontal } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import { scrollToResultsTop } from "../../scroll-to-results";
import { useRefinementFilterCount } from "../use-active-filters";

interface FilterDrawerProps {
  children: ReactNode;
}
export function FilterDrawer({ children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const activeCount = useRefinementFilterCount();
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            "inline-flex cursor-pointer items-center gap-2.5 rounded-full border bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-300",
            activeCount > 0
              ? "border-terracotta/40 text-terracotta"
              : "border-primary/15 text-primary hover:border-terracotta/50",
          )}
        >
          <SlidersHorizontal className="size-4 shrink-0" strokeWidth={2} />
          Refinar
          {activeCount > 0 && (
            <span className="inline-flex min-w-4.5 items-center justify-center rounded-full bg-terracotta px-1 py-0.5 text-[10px] font-bold text-cream tabular-nums">
              {activeCount}
            </span>
          )}
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[85vw] max-w-sm gap-8 overflow-y-auto bg-cream p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] sm:max-w-sm"
        >
          <SheetHeader className="flex-row items-center justify-between gap-2.5 p-0">
            <SheetTitle className="flex items-center gap-2.5 font-display text-lg font-normal text-primary">
              <SlidersHorizontal
                className="size-4 shrink-0 text-terracotta"
                strokeWidth={2}
              />
              Refinar
            </SheetTitle>
          </SheetHeader>
          {children}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              scrollToResultsTop();
            }}
            className="mt-2 w-full cursor-pointer rounded-full bg-linear-to-b from-gold-light to-gold px-6 py-3.5 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90"
          >
            Ver resultados
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
