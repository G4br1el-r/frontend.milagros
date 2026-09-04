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

/**
 * Mesma chamada de `fetchProducts` (product.client.ts), mas direto na API
 * externa em vez de round-trip pela rota interna — so faz sentido em Server
 * Component, onde ja existe o client autenticado usado pelos route handlers.
 * Usado para prefetch da primeira pagina do catalogo em page.tsx.
 */
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

/**
 * Código inexistente não vira 404 nesta rota — a API devolve 200 com um
 * placeholder (`nome: "Produto"`, `preco: 0`, tudo mais nulo/vazio). Sem
 * este filtro, um link quebrado renderizaria uma página fantasma em vez
 * do 404 real.
 */
function isPlaceholderProduct(dto: ProdutoCatalogoDto): boolean {
  return dto.nome === "Produto" && dto.preco === 0 && !dto.categoria;
}

/**
 * Detalhe de um produto pelo código Omie, direto na API externa. Usado no
 * Server Component da página /produtos/[slug], onde já existe o client
 * autenticado.
 */
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
