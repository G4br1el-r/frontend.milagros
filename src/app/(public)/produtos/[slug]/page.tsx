import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProductPage } from "@/components/Modules/Catalog/Home/Products/ProductPage";
import { PRODUCT_FALLBACK_DESCRIPTION } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { mapProdutoToProduct } from "@/components/Modules/Catalog/Home/Products/product.mapper";
import { fetchProductByCodeServer } from "@/components/Modules/Catalog/Home/Products/product.server";
import {
  buildProductSlug,
  parseProductSlug,
} from "@/components/Modules/Catalog/Home/Products/product.slug";

interface ProductRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Página de produto. A URL é `nome-do-produto--CODIGO`: o nome é o que se
 * lê e compartilha, o código é o que resolve o produto na API (ver
 * product.slug.ts). A API não expõe GET de produto individual — quem
 * reconstrói o detalhe a partir do catálogo é `fetchProductByCodeServer`.
 */
async function loadProduct(slug: string) {
  const dto = await fetchProductByCodeServer(parseProductSlug(slug));
  return dto ? mapProdutoToProduct(dto) : null;
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) {
    return { title: "Produto não encontrado | Milagros" };
  }

  const description =
    product.description && product.description !== PRODUCT_FALLBACK_DESCRIPTION
      ? product.description.slice(0, 155)
      : `${product.name} no catálogo litúrgico Milagros.`;

  return {
    title: `${product.name} | Milagros`,
    description,
    alternates: {
      canonical: `/produtos/${buildProductSlug(product.name, product.id)}`,
    },
    openGraph: {
      title: `${product.name} | Milagros`,
      description,
      type: "website",
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function ProdutoPage({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) notFound();

  // Link antigo (só o código) ou produto renomeado no Omie: o link
  // compartilhado continua achando o produto certo, e a URL se corrige
  // para a forma canônica em vez de servir o mesmo conteúdo em dois
  // endereços.
  const canonical = buildProductSlug(product.name, product.id);
  if (decodeURIComponent(slug) !== decodeURIComponent(canonical)) {
    redirect(`/produtos/${canonical}`);
  }

  return (
    <main id="conteudo-principal" className="w-full flex-1">
      <ProductPage product={product} />
    </main>
  );
}
