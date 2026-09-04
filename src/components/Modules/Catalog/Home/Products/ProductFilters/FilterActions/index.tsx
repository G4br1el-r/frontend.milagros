"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";
export function FilterActions() {
  const { reset } = useProductFiltersUrl();
  return (
    <button
      type="button"
      onClick={() => {
        reset();
        appToast.filtersCleared();
      }}
      className="w-full cursor-pointer rounded-full border border-primary/15 bg-white px-3 py-2.5 text-xs font-semibold tracking-[0.06em] text-primary uppercase transition-colors duration-300 hover:border-primary/30"
    >
      Limpar filtros
    </button>
  );
}
