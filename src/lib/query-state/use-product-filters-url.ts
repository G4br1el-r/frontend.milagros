"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { URL_PARAM_KEYS } from "./url-params.constants";

function toNumber(value: string | null): number | undefined {
  if (value === null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
export function useProductFiltersUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const termo = searchParams.get(URL_PARAM_KEYS.termo) ?? "";
  const letra = searchParams.get(URL_PARAM_KEYS.letra);
  const categoria = searchParams.get(URL_PARAM_KEYS.categoria);
  const precoMin = toNumber(searchParams.get(URL_PARAM_KEYS.precoMin));
  const precoMax = toNumber(searchParams.get(URL_PARAM_KEYS.precoMax));
  const page = toNumber(searchParams.get(URL_PARAM_KEYS.pagina)) ?? 1;
  const pageSize =
    toNumber(searchParams.get(URL_PARAM_KEYS.porPagina)) ??
    DEFAULT_PRODUCTS_PER_PAGE;
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
    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }
  return {
    termo,
    letra,
    categoria,
    precoMin,
    precoMax,
    page,
    pageSize,
    setTermo: (value: string) =>
      updateParams({
        [URL_PARAM_KEYS.termo]: value,
        [URL_PARAM_KEYS.letra]: null,
        [URL_PARAM_KEYS.categoria]: null,
        [URL_PARAM_KEYS.precoMin]: null,
        [URL_PARAM_KEYS.precoMax]: null,
      }),
    setLetra: (value: string | null) =>
      updateParams({
        [URL_PARAM_KEYS.letra]: letra === value ? null : value,
      }),
    setCategoria: (value: string | null) =>
      updateParams({
        [URL_PARAM_KEYS.categoria]: categoria === value ? null : value,
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
    reset: () => router.push(pathname, { scroll: false }),
  };
}
