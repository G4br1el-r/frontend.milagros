import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/lib/query/keys";
import {
  fetchProductCategories,
  fetchProductLetters,
  fetchProductPriceRange,
} from "../product.client";

export function useProductCategories() {
  return useQuery({
    queryKey: productQueryKeys.categories,
    queryFn: fetchProductCategories,
  });
}

export function useProductLetters() {
  return useQuery({
    queryKey: productQueryKeys.letters,
    queryFn: fetchProductLetters,
  });
}

export function useProductPriceRange() {
  return useQuery({
    queryKey: productQueryKeys.priceRange,
    queryFn: fetchProductPriceRange,
  });
}
