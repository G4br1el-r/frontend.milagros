import { useQuery } from "@tanstack/react-query";
import {
  FILTER_METADATA_GC_TIME_MS,
  FILTER_METADATA_STALE_TIME_MS,
} from "@/components/Providers/query-provider.constants";
import { productQueryKeys } from "@/lib/query/keys";
import {
  fetchProductCategories,
  fetchProductLetters,
  fetchProductPriceRange,
} from "../product.client";

/** Metadados de filtro mudam com a linha de produtos, nao com preco/estoque. */
const filterMetadataOptions = {
  staleTime: FILTER_METADATA_STALE_TIME_MS,
  gcTime: FILTER_METADATA_GC_TIME_MS,
} as const;

export function useProductCategories() {
  return useQuery({
    queryKey: productQueryKeys.categories,
    queryFn: fetchProductCategories,
    ...filterMetadataOptions,
  });
}

export function useProductLetters() {
  return useQuery({
    queryKey: productQueryKeys.letters,
    queryFn: fetchProductLetters,
    ...filterMetadataOptions,
  });
}

export function useProductPriceRange() {
  return useQuery({
    queryKey: productQueryKeys.priceRange,
    queryFn: fetchProductPriceRange,
    ...filterMetadataOptions,
  });
}
