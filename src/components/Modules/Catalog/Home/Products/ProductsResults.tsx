"use client";
import { useEffect } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";
import { ProductCard } from "./ProductCard";
import { ProductEmptyState } from "./ProductEmptyState";
import { ProductErrorState } from "./ProductErrorState";
import { ProductFilters } from "./ProductFilters";
import { ActiveFilterChips } from "./ProductFilters/ActiveFilterChips";
import { ProductGrid } from "./ProductGrid";
import { ProductGridSkeleton } from "./ProductGrid/ProductGridSkeleton";
import { ProductPagination } from "./ProductPagination";
import { PageSizeSelect } from "./ProductPagination/PageSizeSelect";
import { usePaginationNavigation } from "./ProductPagination/use-pagination";
import { ProductPaginationEnd } from "./ProductPaginationEnd";
import { ProductSearch } from "./ProductSearch";
import { PRIORITY_ROW_COUNT } from "./product.constants";
import { useProducts } from "./use-products";
export function ProductsResults() {
  const {
    products,
    total,
    totalPages,
    page,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProducts();
  const { setPage } = usePaginationNavigation(page);
  const { termo, letra, categoria, precoMin, precoMax, pageSize } = useProductFiltersUrl();
  useEffect(() => {
    if (isError) appToast.productsLoadError(error?.message);
  }, [isError, error]);
  const countLabel = isLoading
    ? "Carregando produtos…"
    : termo
      ? `${products.length} de ${total} resultados para "${termo}"`
      : `Exibindo ${products.length} de ${total} produtos`;
  return (
    <>
      <FadeIn distance={16} delay={0.1}>
        <ProductSearch />
      </FadeIn>
      <FadeIn distance={16} delay={0.2} className="mb-4 flex flex-col gap-3 px-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <ProductFilters mobileOnly />
            </div>
            <span className="text-sm text-primary/55" aria-live="polite">
              {countLabel}
            </span>
          </div>
          {!isLoading && products.length > 0 && <PageSizeSelect />}
        </div>
        <ActiveFilterChips />
      </FadeIn>
      <div className="flex items-start gap-4 px-3 sm:px-4 xl:gap-5">
        <ProductFilters desktopOnly />
        <div className="min-w-0 flex-1 @container">
          {isError ? (
            <ProductErrorState onRetry={refetch} />
          ) : isLoading || isFetching ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <ProductEmptyState />
          ) : (
            <>
              <ProductGrid key={termo + letra + categoria + precoMin + precoMax + page + pageSize}>
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < PRIORITY_ROW_COUNT}
                  />
                ))}
              </ProductGrid>
              <ProductPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
              {page === totalPages && <ProductPaginationEnd />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
