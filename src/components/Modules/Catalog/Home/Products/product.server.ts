import { api } from "@/lib/api";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { withPriceTableParams } from "@/lib/api/with-price-table";
import { NotFoundError } from "@/lib/api-client";
import type { ProductSearchFilters } from "./ProductFilters/filters.types";
import {
  buildProductSearchQuery,
  productSearchHasTerms,
} from "./product.query";
import type { ProdutoCatalogoDto, ProdutosPaginadosDto } from "./product.types";
export async function fetchProductsServer(
  filters: ProductSearchFilters,
): Promise<ProdutosPaginadosDto> {
  const query = new URLSearchParams(buildProductSearchQuery(filters));
  const searchParams = await withPriceTableParams(query);
  const path = productSearchHasTerms(filters)
    ? "/api/produtos/pesquisa"
    : "/api/produtos";
  return withAuthRetry(() =>
    api.get<ProdutosPaginadosDto>(`${path}?${searchParams}`),
  );
}
function isPlaceholderProduct(dto: ProdutoCatalogoDto): boolean {
  return dto.nome === "Produto" && dto.preco === 0 && !dto.categoria;
}
export async function fetchProductByCodeServer(
  codigoOmie: string,
): Promise<ProdutoCatalogoDto | null> {
  const searchParams = await withPriceTableParams(new URLSearchParams());
  try {
    const produto = await withAuthRetry(() =>
      api.get<ProdutoCatalogoDto>(
        `/api/produtos/${encodeURIComponent(codigoOmie)}?${searchParams}`,
      ),
    );
    return isPlaceholderProduct(produto) ? null : produto;
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}
