import type { CartItem } from "@/lib/stores/cart";
import {
  VARIANT_LABEL_COLOR,
  VARIANT_LABEL_MIXED,
  VARIANT_LABEL_PACKAGING,
  VARIANT_QUERY_PARAM,
  VARIANT_TYPE_OPTION,
  VARIANT_TYPE_PACKAGING,
} from "./product.constants";
import { buildProductSlug } from "./product.slug";
import type {
  Product,
  ProductVariant,
  ProdutoVariacaoDto,
} from "./product.types";

export function resolveCompareAtPrice(
  price: number,
  compareAt: number | null,
): number | null {
  return compareAt && compareAt > price ? compareAt : null;
}
const PT_BR_COLLATOR = new Intl.Collator("pt-BR", { numeric: true });

function compareVariants(a: ProductVariant, b: ProductVariant): number {
  return a.price - b.price || PT_BR_COLLATOR.compare(a.name, b.name);
}
export function mapVariants(
  variacoes: ProdutoVariacaoDto[] | null | undefined,
): ProductVariant[] {
  return (variacoes ?? [])
    .filter((variacao) => variacao.ativo && variacao.preco > 0)
    .map((variacao) => ({
      id: variacao.codigoOmie,
      name: variacao.nome.trim(),
      type: variacao.tipoVariacao,
      price: variacao.preco,
      compareAtPrice: resolveCompareAtPrice(variacao.preco, variacao.precoDe),
    }))
    .sort(compareVariants);
}
export function getVariantLabel(variants: ProductVariant[]): string | null {
  if (variants.length === 0) return null;
  const types = new Set(variants.map((variant) => variant.type));
  if (types.size > 1) return VARIANT_LABEL_MIXED;
  const [type] = types;
  if (type === VARIANT_TYPE_PACKAGING) return VARIANT_LABEL_PACKAGING;
  if (type === VARIANT_TYPE_OPTION) return VARIANT_LABEL_COLOR;
  return VARIANT_LABEL_MIXED;
}
export function hasVariants(product: Pick<Product, "variants">): boolean {
  return product.variants.length > 0;
}
export function findVariant(
  product: Pick<Product, "variants">,
  variantId: string | null | undefined,
): ProductVariant | null {
  if (!variantId) return null;
  return product.variants.find((variant) => variant.id === variantId) ?? null;
}
export function getDefaultVariant(
  product: Pick<Product, "variants">,
): ProductVariant | null {
  return product.variants[0] ?? null;
}
export function getPriceRange(product: Pick<Product, "variants" | "price">): {
  min: number;
  max: number;
} {
  if (!hasVariants(product)) return { min: product.price, max: product.price };
  const prices = product.variants.map((variant) => variant.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
export function buildProductHref(
  name: string,
  productId: string,
  variantId?: string | null,
): string {
  const path = `/produtos/${buildProductSlug(name, productId)}`;
  if (!variantId || variantId === productId) return path;
  const query = new URLSearchParams({ [VARIANT_QUERY_PARAM]: variantId });
  return `${path}?${query}`;
}
export function toCartProduct(
  product: Pick<Product, "id" | "name" | "image" | "price">,
  variant: ProductVariant | null,
): Omit<CartItem, "quantity"> {
  return {
    id: variant?.id ?? product.id,
    productId: product.id,
    name: product.name,
    variantName: variant?.name ?? null,
    image: product.image,
    price: variant?.price ?? product.price,
  };
}
