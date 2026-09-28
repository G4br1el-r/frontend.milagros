"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { readProductFiltersParams } from "./product-filters-params";
import { URL_PARAM_KEYS } from "./url-params.constants";

export function useProductFiltersUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    termo,
    letra,
    categoria,
    subcategoria,
    precoMin,
    precoMax,
    page,
    pageSize,
  } = readProductFiltersParams(searchParams);
  function updateParams(
    updates: Record<string, string | number | undefined | null>,
    options: { resetPage?: boolean } = {},
  ) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }
    if (options.resetPage ?? true) {
      params.delete(URL_PARAM_KEYS.pagina);
    }
    const query = params.toString();
    window.history.pushState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  }
  return {
    termo,
    letra,
    categoria,
    subcategoria,
    precoMin,
    precoMax,
    page,
    pageSize,
    setTermo: (value: string) =>
      updateParams({
        [URL_PARAM_KEYS.termo]: value,
        [URL_PARAM_KEYS.letra]: null,
        [URL_PARAM_KEYS.categoria]: null,
        [URL_PARAM_KEYS.subcategoria]: null,
        [URL_PARAM_KEYS.precoMin]: null,
        [URL_PARAM_KEYS.precoMax]: null,
      }),
    setLetra: (value: string | null) =>
      updateParams({
        [URL_PARAM_KEYS.letra]: letra === value ? null : value,
      }),
    setCategoria: (value: string | null) =>
      updateParams({
        [URL_PARAM_KEYS.categoria]: value,
        [URL_PARAM_KEYS.subcategoria]: null,
      }),
    setSubcategoria: (value: string | null) =>
      updateParams({
        [URL_PARAM_KEYS.categoria]: null,
        [URL_PARAM_KEYS.subcategoria]: value,
      }),
    setPrecoRange: (min?: number, max?: number) =>
      updateParams({
        [URL_PARAM_KEYS.precoMin]: min,
        [URL_PARAM_KEYS.precoMax]: max,
      }),
    setPageSize: (value: number) =>
      updateParams({ [URL_PARAM_KEYS.porPagina]: value }),
    setPage: (value: number) =>
      updateParams(
        { [URL_PARAM_KEYS.pagina]: value === 1 ? undefined : value },
        { resetPage: false },
      ),
    reset: () => window.history.pushState(null, "", pathname),
  };
}
