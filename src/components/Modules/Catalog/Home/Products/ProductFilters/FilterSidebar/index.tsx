"use client";
import { SlidersHorizontal } from "lucide-react";
import { FilterPanelContent } from "../FilterPanelContent";
import { useActiveFilterCount } from "../use-active-filters";

export function FilterSidebar() {
  const activeCount = useActiveFilterCount();
  return (
    <aside className="hidden w-80 shrink-0 lg:block">
      <div className="flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-white/60">
        <div className="flex items-center gap-2.5 border-b border-primary/10 px-7 py-5">
          <SlidersHorizontal
            className="size-4 shrink-0 text-terracotta"
            strokeWidth={2}
          />
          <span className="font-display text-lg text-primary">Filtrar</span>
          {activeCount > 0 && (
            <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 py-0.5 text-[10px] font-bold text-cream tabular-nums">
              {activeCount}
            </span>
          )}
        </div>
        <div className="px-7 py-6">
          <FilterPanelContent />
        </div>
      </div>
    </aside>
  );
}
