export interface CategoriaFiltroDto {
  id: number;
  nome: string;
  isPrincipal: boolean;
  categoriaPaiId: number | null;
  categoriaPaiNome: string | null;
  totalProdutos: number;
  subcategorias: CategoriaFiltroDto[];
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
  subcategoria?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
  pageSize?: number;
}
