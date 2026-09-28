import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { MAX_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import {
  fetchProductsServer,
  isPlaceholderProduct,
} from "@/components/Modules/Catalog/Home/Products/product.server";
import { buildProductSlug } from "@/components/Modules/Catalog/Home/Products/product.slug";
import type { ProdutoCatalogoDto } from "@/components/Modules/Catalog/Home/Products/product.types";
import { DEFAULT_PAGE } from "@/lib/query-state/url-params.constants";
import { SITEMAP_MAX_PRODUCT_PAGES } from "@/lib/site/site.constants";
import { toAbsoluteUrl } from "@/lib/site/site-url";

function fetchCatalogPage(page: number) {
  return fetchProductsServer({ page, pageSize: MAX_PRODUCTS_PER_PAGE });
}
async function fetchCatalogProducts(): Promise<ProdutoCatalogoDto[]> {
  const firstPage = await fetchCatalogPage(DEFAULT_PAGE);
  const pageCount = Math.min(firstPage.totalPaginas, SITEMAP_MAX_PRODUCT_PAGES);
  const otherPages = await Promise.all(
    Array.from({ length: pageCount }, (_, index) => index + DEFAULT_PAGE)
      .filter((page) => page !== DEFAULT_PAGE)
      .map(fetchCatalogPage),
  );
  return [firstPage, ...otherPages].flatMap((result) => result.itens);
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const products = await fetchCatalogProducts();
  return [
    { url: toAbsoluteUrl("/") },
    ...products
      .filter((product) => !isPlaceholderProduct(product))
      .map((product) => ({
        url: toAbsoluteUrl(
          `/produtos/${buildProductSlug(product.nome, product.codigoOmie)}`,
        ),
      })),
  ];
}
