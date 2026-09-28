import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { MAIN_CONTENT_ID } from "@/components/Layout/skip-link.constants";
import { Hero } from "@/components/Modules/Catalog/Home/Hero";
import { Products } from "@/components/Modules/Catalog/Home/Products";
import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";
import { fetchProductsServer } from "@/components/Modules/Catalog/Home/Products/product.server";
import { productQueryKeys } from "@/lib/query/keys";
import {
  readProductFiltersParams,
  toProductSearchFilters,
} from "@/lib/query-state/product-filters-params";

export const metadata: Metadata = {
  title: "Catálogo de incensos e carvões litúrgicos | Milagros",
  description:
    "Incensos de resina, carvões e acessórios religiosos, para toda paróquia, capela e devoto. Uma chama para cada devoção, um incenso para cada santo.",
};
type HomeSearchParams = PageProps<"/">["searchParams"];

async function PrefetchedProducts({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const resolvedParams = await searchParams;
  const filters = toProductSearchFilters(
    readProductFiltersParams({
      get: (key) => {
        const value = resolvedParams[key];
        return (Array.isArray(value) ? value[0] : value) ?? null;
      },
    }),
  );
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: productQueryKeys.search(filters),
    queryFn: () => fetchProductsServer(filters),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  );
}
export default async function Home({ searchParams }: PageProps<"/">) {
  await connection();
  return (
    <main id={MAIN_CONTENT_ID} className="w-full flex-1">
      <Hero />
      <Suspense fallback={<ProductsSectionSkeleton />}>
        <PrefetchedProducts searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
