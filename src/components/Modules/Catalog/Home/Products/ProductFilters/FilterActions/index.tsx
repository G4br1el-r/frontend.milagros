"use client";
import { X } from "lucide-react";
import { appToast } from "@/lib/toast/toast";
import { useActiveFilterCount } from "../use-active-filters";
import { useProductFiltersWithScroll } from "../use-filters-with-scroll";

export function FilterActions() {
  const { reset } = useProductFiltersWithScroll();
  const activeCount = useActiveFilterCount();
  if (activeCount === 0) return null;
  return (
    <button
      type="button"
      onClick={() => {
        reset();
        appToast.filtersCleared();
      }}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-2.5 text-xs font-semibold tracking-[0.06em] text-primary uppercase transition-colors duration-300 hover:border-terracotta/50 hover:text-terracotta"
    >
      <X className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      Limpar {activeCount} {activeCount === 1 ? "filtro" : "filtros"}
    </button>
  );
}
