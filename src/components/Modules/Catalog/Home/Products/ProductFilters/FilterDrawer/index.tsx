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
import { useActiveFilterCount } from "../use-active-filters";

interface FilterDrawerProps {
  children: ReactNode;
}
export function FilterDrawer({ children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const activeCount = useActiveFilterCount();
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
          Filtrar
          {activeCount > 0 && (
            <span className="inline-flex min-w-4.5 items-center justify-center rounded-full bg-terracotta px-1 py-0.5 text-[10px] font-bold text-cream tabular-nums">
              {activeCount}
            </span>
          )}
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-0 bg-cream p-0 data-[side=left]:w-screen data-[side=left]:sm:max-w-none"
        >
          <SheetHeader className="shrink-0 flex-row items-center justify-between gap-2.5 border-b border-primary/10 px-5 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-4">
            <SheetTitle className="flex items-center gap-2.5 font-display text-lg font-normal text-primary">
              <SlidersHorizontal
                className="size-4 shrink-0 text-terracotta"
                strokeWidth={2}
              />
              Filtrar
              {activeCount > 0 && (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 py-0.5 text-[10px] font-bold text-cream tabular-nums">
                  {activeCount}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
            {children}
          </div>
          <div className="shrink-0 border-t border-primary/10 bg-cream px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                scrollToResultsTop();
              }}
              className="w-full cursor-pointer rounded-full bg-linear-to-b from-gold-light to-gold px-6 py-3.5 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90"
            >
              Ver resultados
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
