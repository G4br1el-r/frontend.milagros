import type { ProductSearchFilters } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
export const productQueryKeys = {
  all: ["products"] as const,
  search: (filters: ProductSearchFilters) =>
    [...productQueryKeys.all, "search", filters] as const,
  detail: (codigoOmie: string) =>
    [...productQueryKeys.all, "detail", codigoOmie] as const,
  categories: ["product-categories"] as const,
  letters: ["product-letters"] as const,
  priceRange: ["product-price-range"] as const,
};
export const accountQueryKeys = {
  orders: (cpfCnpj: string) => ["account-orders", cpfCnpj] as const,
};
