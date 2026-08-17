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

interface FilterDrawerProps {
  children: ReactNode;
}

export function FilterDrawer({ children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-primary/15 bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-primary uppercase transition-colors duration-300 hover:border-terracotta/50">
          <SlidersHorizontal className="size-4 shrink-0" strokeWidth={2} />
          Filtrar
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
              Filtrar
            </SheetTitle>
          </SheetHeader>

          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
