"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { scrollToResultsTop } from "../scroll-to-results";

function withScroll<TArgs extends unknown[]>(action: (...args: TArgs) => void) {
  return (...args: TArgs) => {
    action(...args);
    scrollToResultsTop();
  };
}
export function useProductFiltersWithScroll() {
  const filters = useProductFiltersUrl();
  return {
    ...filters,
    setLetra: withScroll(filters.setLetra),
    setCategoria: withScroll(filters.setCategoria),
    setSubcategoria: withScroll(filters.setSubcategoria),
    setPrecoRange: withScroll(filters.setPrecoRange),
    reset: withScroll(filters.reset),
  };
}
