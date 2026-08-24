import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { productQueryKeys } from "@/lib/query/keys";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { appToast } from "@/lib/toast/toast";
import type { ProductSearchFilters } from "./ProductFilters/filters.types";
import { fetchProducts } from "./product.client";
import { mapProdutoToProduct } from "./product.mapper";

export function useProducts() {
  const { termo, letra, categoria, precoMin, precoMax } =
    useProductFiltersUrl();

  const filters: ProductSearchFilters = {
    termo: termo || undefined,
    letra: letra ?? undefined,
    categoria: categoria ?? undefined,
    precoMin,
    precoMax,
  };

  const query = useQuery({
    queryKey: productQueryKeys.search(filters),
    queryFn: () => fetchProducts(filters),
  });

  useFiltersAppliedToast(filters, query.refetch);

  const products = query.data?.map(mapProdutoToProduct) ?? [];

  return {
    products,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

function useFiltersAppliedToast(
  filters: ProductSearchFilters,
  refetch: () => Promise<{ data?: unknown[] }>,
) {
  const filtersKey = JSON.stringify(filters);
  const hasLoadedOnce = useRef(false);
  const previousFiltersKey = useRef(filtersKey);
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;

  useEffect(() => {
    if (!hasLoadedOnce.current) {
      hasLoadedOnce.current = true;
      return;
    }

    if (previousFiltersKey.current === filtersKey) return;
    previousFiltersKey.current = filtersKey;

    appToast.filtersApplied(
      refetchRef.current().then((result) => result.data?.length ?? 0),
    );
  }, [filtersKey]);
}
