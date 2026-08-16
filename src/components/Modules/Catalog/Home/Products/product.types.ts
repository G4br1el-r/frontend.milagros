export type ProductBadge = "novidade" | "mais-vendido";

export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  devotion: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  attributes: ProductAttribute[];
}

export const PRODUCT_BADGE_LABEL: Record<ProductBadge, string> = {
  novidade: "Novidade",
  "mais-vendido": "Mais vendido",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}
