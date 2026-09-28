"use client";
import { useMemo } from "react";
import type { CategoriaFiltroDto } from "./filters.types";
import { useProductCategories } from "./use-filter-options";

function hasProducts(category: CategoriaFiltroDto): boolean {
  return (
    category.totalProdutos > 0 ||
    category.subcategorias.some((sub) => sub.totalProdutos > 0)
  );
}
export function useCategoryTree() {
  const { data, isLoading } = useProductCategories();
  const principais = useMemo(
    () =>
      (data ?? [])
        .filter((category) => category.isPrincipal && hasProducts(category))
        .map((category) => ({
          ...category,
          subcategorias: category.subcategorias.filter(
            (sub) => sub.totalProdutos > 0,
          ),
        })),
    [data],
  );
  return { principais, isLoading };
}
export function findCategoryBySubcategoria(
  principais: CategoriaFiltroDto[],
  subcategoria: string | null,
): CategoriaFiltroDto | null {
  if (!subcategoria) return null;
  return (
    principais.find((category) =>
      category.subcategorias.some((sub) => sub.nome === subcategoria),
    ) ?? null
  );
}
