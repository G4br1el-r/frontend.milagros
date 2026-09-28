import type { ProductSearchFilters } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { DEFAULT_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { DEFAULT_PAGE, URL_PARAM_KEYS } from "./url-params.constants";

type SearchParamsReader = Pick<URLSearchParams, "get">;

function toNumber(value: string | null): number | undefined {
  if (value === null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
export function readProductFiltersParams(searchParams: SearchParamsReader) {
  return {
    termo: searchParams.get(URL_PARAM_KEYS.termo) ?? "",
    letra: searchParams.get(URL_PARAM_KEYS.letra),
    categoria: searchParams.get(URL_PARAM_KEYS.categoria),
    subcategoria: searchParams.get(URL_PARAM_KEYS.subcategoria),
    precoMin: toNumber(searchParams.get(URL_PARAM_KEYS.precoMin)),
    precoMax: toNumber(searchParams.get(URL_PARAM_KEYS.precoMax)),
    page: toNumber(searchParams.get(URL_PARAM_KEYS.pagina)) ?? DEFAULT_PAGE,
    pageSize:
      toNumber(searchParams.get(URL_PARAM_KEYS.porPagina)) ??
      DEFAULT_PRODUCTS_PER_PAGE,
  };
}
export type ProductFiltersParams = ReturnType<typeof readProductFiltersParams>;
export function toProductSearchFilters(
  params: ProductFiltersParams,
): ProductSearchFilters {
  return {
    termo: params.termo || undefined,
    letra: params.letra ?? undefined,
    categoria: params.categoria ?? undefined,
    subcategoria: params.subcategoria ?? undefined,
    precoMin: params.precoMin,
    precoMax: params.precoMax,
    page: params.page,
    pageSize: params.pageSize,
  };
}
