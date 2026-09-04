"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/lib/query/keys";
import { ProductCard } from "../ProductCard";
import { fetchProducts } from "../product.client";
import { mapProdutoToProduct } from "../product.mapper";

const RELATED_PRODUCTS_LIMIT = 4;

interface ProductRelatedProps {
  category: string;
  excludeId: string;
}

/**
 * Relacionados por categoria (seção 3 — a API não tem campo de devoção).
 * Client component: o modal de produto é aberto por clique (store), sem
 * rota dedicada, então a busca usa o mesmo caminho client-side do resto
 * do catálogo (fetchProducts via /api/produtos), não o fetch server-only.
 */
export function ProductRelated({ category, excludeId }: ProductRelatedProps) {
  const filters = {
    categoria: category,
    page: 1,
    pageSize: RELATED_PRODUCTS_LIMIT + 1,
  };

  const { data } = useQuery({
    queryKey: productQueryKeys.search(filters),
    queryFn: () => fetchProducts(filters),
  });

  const related = (data?.itens ?? [])
    .filter((item) => item.codigoOmie !== excludeId)
    .slice(0, RELATED_PRODUCTS_LIMIT)
    .map(mapProdutoToProduct);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="produtos-relacionados-heading"
      className="flex flex-col gap-5"
    >
      <h2
        id="produtos-relacionados-heading"
        className="font-display text-xl text-primary sm:text-2xl"
      >
        Você também pode gostar
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
