import type {
  CategoriaFiltroDto,
  FaixaPrecoDto,
  LetraFiltroDto,
  ProductSearchFilters,
} from "./ProductFilters/filters.types";
import {
  buildProductSearchQuery,
  productSearchHasTerms,
} from "./product.query";
import type { ProdutoCatalogoDto, ProdutosPaginadosDto } from "./product.types";

async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Falha ao consumir a API de produtos");
  }

  return response.json() as Promise<T>;
}

export async function fetchProducts(
  filters: ProductSearchFilters,
): Promise<ProdutosPaginadosDto> {
  const query = buildProductSearchQuery(filters);
  const path = productSearchHasTerms(filters)
    ? `/api/produtos/pesquisa?${query}`
    : `/api/produtos?${query}`;

  const response = await fetch(path);
  return parseJsonOrThrow<ProdutosPaginadosDto>(response);
}

export async function fetchProductCategories(): Promise<CategoriaFiltroDto[]> {
  const response = await fetch("/api/produtos/categorias");
  return parseJsonOrThrow<CategoriaFiltroDto[]>(response);
}

export async function fetchProductLetters(): Promise<LetraFiltroDto[]> {
  const response = await fetch("/api/produtos/letras");
  return parseJsonOrThrow<LetraFiltroDto[]>(response);
}

export async function fetchProductPriceRange(): Promise<FaixaPrecoDto> {
  const response = await fetch("/api/produtos/faixa-preco");
  return parseJsonOrThrow<FaixaPrecoDto>(response);
}

export async function fetchProductByCode(
  codigoOmie: string,
): Promise<ProdutoCatalogoDto> {
  const response = await fetch(
    `/api/produtos/${encodeURIComponent(codigoOmie)}`,
  );
  return parseJsonOrThrow<ProdutoCatalogoDto>(response);
}
