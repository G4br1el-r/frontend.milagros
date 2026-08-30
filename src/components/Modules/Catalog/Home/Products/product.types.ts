export interface ProdutoCatalogoDto {
  codigoOmie: string;
  nome: string;
  preco: number;
  unidade: string | null;
  pesoKg: number | null;
  altura: string | null;
  largura: string | null;
  profundidade: string | null;
  estoqueAtual: number | null;
  descricao: string | null;
  categoria: string | null;
  imagens: string[] | null;
  precoDe: number | null;
  tempoQueima: string | null;
  tipo: string | null;
  rating: number | null;
  totalAvaliacoes: number | null;
}

export interface ProdutosPaginadosDto {
  itens: ProdutoCatalogoDto[];
  pagina: number;
  pageSize: number;
  total: number;
  totalPaginas: number;
}

export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  images: string[];
  hasImage: boolean;
  price: number;
  compareAtPrice: number | null;
  category: string | null;
  type: string | null;
  unit: string | null;
  weightKg: number | null;
  stock: number | null;
  inStock: boolean;
  burnTime: string | null;
  rating: number | null;
  reviewCount: number;
  attributes: ProductAttribute[];
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}
