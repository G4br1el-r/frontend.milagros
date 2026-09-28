import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MAIN_CONTENT_ID } from "@/components/Layout/skip-link.constants";
import { ProductPage } from "@/components/Modules/Catalog/Home/Products/ProductPage";
import { PRODUCT_FALLBACK_DESCRIPTION } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { mapProdutoToProduct } from "@/components/Modules/Catalog/Home/Products/product.mapper";
import { fetchProductByCodeServer } from "@/components/Modules/Catalog/Home/Products/product.server";
import {
  buildProductSlug,
  parseProductSlug,
} from "@/components/Modules/Catalog/Home/Products/product.slug";
import type { Product } from "@/components/Modules/Catalog/Home/Products/product.types";
import { serializeJsonLd } from "@/lib/site/json-ld";
import {
  SITE_LOCALE,
  SITE_NAME,
  TWITTER_CARD,
} from "@/lib/site/site.constants";
import { toAbsoluteUrl } from "@/lib/site/site-url";

interface ProductRouteProps {
  params: Promise<{ slug: string }>;
}
async function loadProduct(slug: string) {
  const codigoOmie = parseProductSlug(slug);
  if (codigoOmie === null) return null;
  const dto = await fetchProductByCodeServer(codigoOmie);
  return dto ? mapProdutoToProduct(dto) : null;
}
function getOwnDescription(product: Product): string | null {
  return product.description &&
    product.description !== PRODUCT_FALLBACK_DESCRIPTION
    ? product.description
    : null;
}
function buildProductJsonLd(product: Product, canonicalPath: string) {
  const url = toAbsoluteUrl(canonicalPath);
  const description = getOwnDescription(product);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    url,
    ...(product.hasImage ? { image: product.images } : {}),
    ...(description ? { description } : {}),
    ...(product.category ? { category: product.category } : {}),
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "BRL",
      ...(product.stock !== null
        ? {
            availability:
              product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
          }
        : {}),
    },
    ...(product.rating !== null && product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };
}
export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) {
    return { title: "Produto não encontrado | Milagros" };
  }
  const ownDescription = getOwnDescription(product);
  const description = ownDescription
    ? ownDescription.slice(0, 155)
    : `${product.name} no catálogo litúrgico Milagros.`;
  const title = `${product.name} | Milagros`;
  const images = product.image
    ? [{ url: product.image, alt: product.name }]
    : undefined;
  return {
    title,
    description,
    alternates: {
      canonical: `/produtos/${buildProductSlug(product.name, product.id)}`,
    },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images,
    },
    twitter: {
      card: TWITTER_CARD,
      title,
      description,
      images,
    },
  };
}
export default async function ProdutoPage({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();
  const canonical = buildProductSlug(product.name, product.id);
  if (decodeURIComponent(slug) !== decodeURIComponent(canonical)) {
    redirect(`/produtos/${canonical}`);
  }
  return (
    <main id={MAIN_CONTENT_ID} className="w-full flex-1">
      <script type="application/ld+json">
        {serializeJsonLd(buildProductJsonLd(product, `/produtos/${canonical}`))}
      </script>
      <ProductPage product={product} />
    </main>
  );
}
