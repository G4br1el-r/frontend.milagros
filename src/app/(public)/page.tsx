import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { Hero } from "@/components/Modules/Catalog/Home/Hero";
import { Products } from "@/components/Modules/Catalog/Home/Products";
import type { ProductSearchFilters } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";
import { DEFAULT_PRODUCTS_PER_PAGE } from "@/components/Modules/Catalog/Home/Products/product.constants";
import { fetchProductsServer } from "@/components/Modules/Catalog/Home/Products/product.server";
import { productQueryKeys } from "@/lib/query/keys";

// Precisa bater byte a byte com o objeto que useProductFiltersUrl() monta
// quando a URL nao tem nenhum parametro de filtro — e o que garante que o
// useQuery do client encontre esta entrada no cache em vez de refazer a busca.
const DEFAULT_FILTERS: ProductSearchFilters = {
  termo: undefined,
  letra: undefined,
  categoria: undefined,
  precoMin: undefined,
  precoMax: undefined,
  page: 1,
  pageSize: DEFAULT_PRODUCTS_PER_PAGE,
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: productQueryKeys.search(DEFAULT_FILTERS),
    queryFn: () => fetchProductsServer(DEFAULT_FILTERS),
  });

  return (
    <main id="conteudo-principal" className="w-full flex-1">
      <Hero />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <Products />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
