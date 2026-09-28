"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";

export function useActiveFilterCount(): number {
  const { termo, letra, categoria, subcategoria, precoMin, precoMax } =
    useProductFiltersUrl();
  let count = 0;
  if (termo) count += 1;
  if (letra) count += 1;
  if (categoria) count += 1;
  if (subcategoria) count += 1;
  if (precoMin !== undefined || precoMax !== undefined) count += 1;
  return count;
}
export function useRefinementFilterCount(): number {
  const { letra, precoMin, precoMax } = useProductFiltersUrl();
  let count = 0;
  if (letra) count += 1;
  if (precoMin !== undefined || precoMax !== undefined) count += 1;
  return count;
}
