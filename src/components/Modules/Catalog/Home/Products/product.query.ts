import type { ProductSearchFilters } from "./ProductFilters/filters.types";

/**
 * Monta a query string da API de produtos a partir dos filtros da UI.
 * Compartilhado entre o fetch client-side (product.client.ts, via fetch
 * para a rota interna) e o server-side (product.server.ts, direto na API).
 */
export function buildProductSearchQuery(filters: ProductSearchFilters): string {
  const params = new URLSearchParams();

  if (filters.termo) params.set("Termo", filters.termo);
  if (filters.letra) params.set("Letra", filters.letra);
  if (filters.categoria) params.set("Categoria", filters.categoria);
  if (filters.precoMin !== undefined)
    params.set("PrecoMin", String(filters.precoMin));
  if (filters.precoMax !== undefined)
    params.set("PrecoMax", String(filters.precoMax));
  if (filters.page !== undefined) params.set("Page", String(filters.page));
  if (filters.pageSize !== undefined)
    params.set("PageSize", String(filters.pageSize));

  return params.toString();
}

export function productSearchHasTerms(filters: ProductSearchFilters): boolean {
  return Boolean(
    filters.termo ||
      filters.letra ||
      filters.categoria ||
      filters.precoMin !== undefined ||
      filters.precoMax !== undefined,
  );
}
