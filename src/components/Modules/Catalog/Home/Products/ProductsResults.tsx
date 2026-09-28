"use client";
import { useEffect } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";
import { CategoryScroller } from "./CategoryScroller";
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
import { useProducts } from "./use-products";
export function ProductsResults() {
  const {
    products,
    total,
    totalPages,
    page,
    isLoading,
    isPlaceholderData,
    isError,
    error,
    refetch,
  } = useProducts();
  const { setPage } = usePaginationNavigation(page);
  const { termo, letra, categoria, subcategoria, precoMin, precoMax } =
    useProductFiltersUrl();
  const resultsKey = [
    termo,
    letra,
    categoria,
    subcategoria,
    precoMin,
    precoMax,
    page,
  ].join("|");
  useEffect(() => {
    if (isError) appToast.productsLoadError(error?.message);
  }, [isError, error]);
  const isShowingSkeleton = isLoading || isPlaceholderData;
  const countLabel = isShowingSkeleton
    ? "Carregando produtos…"
    : termo
      ? `${products.length} de ${total} resultados para "${termo}"`
      : `Exibindo ${products.length} de ${total} produtos`;
  return (
    <>
      <FadeIn distance={16} delay={0.1}>
        <ProductSearch />
      </FadeIn>
      <FadeIn
        distance={16}
        delay={0.2}
        className="mb-4 flex flex-col gap-3 px-3 sm:px-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span className="text-sm text-primary/55" aria-live="polite">
            {countLabel}
          </span>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="lg:hidden">
              <ProductFilters mobileOnly />
            </div>
            {!isShowingSkeleton && products.length > 0 && <PageSizeSelect />}
          </div>
        </div>
        <CategoryScroller />
        <ActiveFilterChips />
      </FadeIn>
      <div className="flex items-start gap-4 px-3 sm:px-4 xl:gap-5">
        <ProductFilters desktopOnly />
        <div className="min-w-0 flex-1 @container">
          {isError ? (
            <ProductErrorState onRetry={refetch} />
          ) : isShowingSkeleton ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <ProductEmptyState />
          ) : (
            <>
              <ProductGrid key={resultsKey}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
