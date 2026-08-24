import type {
  CategoriaFiltroDto,
  FaixaPrecoDto,
  LetraFiltroDto,
  ProductSearchFilters,
} from "./ProductFilters/filters.types";
import type { ProdutoCatalogoDto } from "./product.types";

async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Falha ao consumir a API de produtos");
  }

  return response.json() as Promise<T>;
}

function buildSearchQuery(filters: ProductSearchFilters): string {
  const params = new URLSearchParams();

  if (filters.termo) params.set("Termo", filters.termo);
  if (filters.letra) params.set("Letra", filters.letra);
  if (filters.categoria) params.set("Categoria", filters.categoria);
  if (filters.precoMin !== undefined)
    params.set("PrecoMin", String(filters.precoMin));
  if (filters.precoMax !== undefined)
    params.set("PrecoMax", String(filters.precoMax));

  return params.toString();
}

export async function fetchProducts(
  filters: ProductSearchFilters,
): Promise<ProdutoCatalogoDto[]> {
  const query = buildSearchQuery(filters);
  const path = query ? `/api/produtos/pesquisa?${query}` : "/api/produtos";

  const response = await fetch(path);
  return parseJsonOrThrow<ProdutoCatalogoDto[]>(response);
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
