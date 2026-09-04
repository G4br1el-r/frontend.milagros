"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { CategoryOption } from "../CategoryOption";
import { CategoryOptionSkeleton } from "../CategoryOption/CategoryOptionSkeleton";
import { useProductCategories } from "../use-filter-options";
export function CategoryFilterGroup() {
  const { data: categories, isLoading } = useProductCategories();
  const { categoria, setCategoria } = useProductFiltersUrl();
  if (isLoading) {
    return (
      <div className="flex flex-col">
        <CategoryOptionSkeleton />
        <CategoryOptionSkeleton />
        <CategoryOptionSkeleton />
      </div>
    );
  }
  if (!categories || categories.length === 0) return null;
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <CategoryOption
          key={category.nome}
          label={category.nome}
          count={category.totalProdutos}
          selected={categoria === category.nome}
          onSelect={() => setCategoria(category.nome)}
        />
      ))}
    </div>
  );
}
