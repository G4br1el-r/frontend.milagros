import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/lib/query/keys";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import type { ProductSearchFilters } from "./ProductFilters/filters.types";
import { fetchProducts } from "./product.client";
import { mapProdutoToProduct } from "./product.mapper";

export function useProducts() {
  const { termo, letra, categoria, precoMin, precoMax, page, pageSize } =
    useProductFiltersUrl();

  const filters: ProductSearchFilters = {
    termo: termo || undefined,
    letra: letra ?? undefined,
    categoria: categoria ?? undefined,
    precoMin,
    precoMax,
    page,
    pageSize,
  };

  const query = useQuery({
    queryKey: productQueryKeys.search(filters),
    queryFn: () => fetchProducts(filters),
    // A grade anterior continua visivel enquanto a nova chega, em vez de
    // voltar ao skeleton a cada troca de filtro ou pagina.
    placeholderData: keepPreviousData,
  });

  const products = query.data?.itens?.map(mapProdutoToProduct) ?? [];

  return {
    products,
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPaginas ?? 1,
    page: query.data?.pagina ?? page,
    // Skeleton so no primeiro load; depois disso a grade anterior fica no ar.
    isLoading: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
