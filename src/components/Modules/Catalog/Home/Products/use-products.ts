import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/lib/query/keys";
import { toProductSearchFilters } from "@/lib/query-state/product-filters-params";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { fetchProducts } from "./product.client";
import { mapProdutoToProduct } from "./product.mapper";
export function useProducts() {
  const urlFilters = useProductFiltersUrl();
  const filters = toProductSearchFilters(urlFilters);
  const query = useQuery({
    queryKey: productQueryKeys.search(filters),
    queryFn: () => fetchProducts(filters),
    placeholderData: keepPreviousData,
  });
  const products = query.data?.itens?.map(mapProdutoToProduct) ?? [];
  return {
    products,
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPaginas ?? 1,
    page: query.data?.pagina ?? urlFilters.page,
    isLoading: query.isPending,
    isFetching: query.isFetching,
    isPlaceholderData: query.isPlaceholderData,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
