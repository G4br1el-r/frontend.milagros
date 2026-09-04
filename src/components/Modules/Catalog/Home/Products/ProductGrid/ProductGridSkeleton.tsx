"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { ProductCardSkeleton } from "../ProductCard/ProductCardSkeleton";
export function ProductGridSkeleton() {
  const { pageSize } = useProductFiltersUrl();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5">
      {Array.from({ length: pageSize }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de placeholders sem identidade própria
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
