export interface CategoriaFiltroDto {
  nome: string;
  totalProdutos: number;
}

export interface LetraFiltroDto {
  letra: string;
  totalProdutos: number;
}

export interface FaixaPrecoDto {
  precoMinimo: number;
  precoMaximo: number;
}

export interface ProductSearchFilters {
  termo?: string;
  letra?: string;
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
  pageSize?: number;
}
