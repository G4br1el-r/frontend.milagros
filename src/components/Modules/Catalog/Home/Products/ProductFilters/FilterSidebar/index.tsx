import { SlidersHorizontal } from "lucide-react";
import { FilterPanelContent } from "../FilterPanelContent";

export function FilterSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 lg:block">
      <div className="sticky top-28 flex flex-col gap-8 rounded-3xl border border-primary/10 bg-white/60 p-7">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal
            className="size-4 shrink-0 text-terracotta"
            strokeWidth={2}
          />
          <span className="font-display text-lg text-primary">Filtrar</span>
        </div>

        <FilterPanelContent />
      </div>
    </aside>
  );
}
