"use client";
import { cn } from "@/lib/utils/cn";
import {
  findCategoryBySubcategoria,
  useCategoryTree,
} from "../ProductFilters/use-category-tree";
import { useProductFiltersWithScroll } from "../ProductFilters/use-filters-with-scroll";

const PILL_CLASS =
  "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200";

export function CategoryScroller() {
  const { principais, isLoading } = useCategoryTree();
  const { categoria, subcategoria, setCategoria, setSubcategoria } =
    useProductFiltersWithScroll();
  if (isLoading || principais.length === 0) return null;
  const activeParent =
    principais.find((item) => item.nome === categoria) ??
    findCategoryBySubcategoria(principais, subcategoria);
  const hasAnySelection = Boolean(categoria || subcategoria);
  return (
    <div className="flex flex-col gap-2 lg:hidden">
      <div className="-mx-3 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCategoria(null)}
            aria-pressed={!hasAnySelection}
            className={cn(
              PILL_CLASS,
              !hasAnySelection
                ? "border-terracotta bg-terracotta font-medium text-cream"
                : "border-primary/15 bg-white text-primary/70",
            )}
          >
            Todos
          </button>
          {principais.map((category) => {
            const active = activeParent?.id === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoria(category.nome)}
                aria-pressed={active}
                className={cn(
                  PILL_CLASS,
                  active
                    ? "border-terracotta bg-terracotta font-medium text-cream"
                    : "border-primary/15 bg-white text-primary/70",
                )}
              >
                {category.nome}
              </button>
            );
          })}
        </div>
      </div>
      {activeParent && activeParent.subcategorias.length > 0 && (
        <div className="-mx-3 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCategoria(activeParent.nome)}
              aria-pressed={!subcategoria}
              className={cn(
                PILL_CLASS,
                "border-dashed px-3 py-1.5 text-xs",
                !subcategoria
                  ? "border-terracotta/60 bg-terracotta/10 font-medium text-terracotta"
                  : "border-primary/20 bg-transparent text-primary/60",
              )}
            >
              Ver tudo
            </button>
            {activeParent.subcategorias.map((sub) => {
              const selected = subcategoria === sub.nome;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSubcategoria(sub.nome)}
                  aria-pressed={selected}
                  className={cn(
                    PILL_CLASS,
                    "px-3 py-1.5 text-xs",
                    selected
                      ? "border-terracotta bg-terracotta/10 font-medium text-terracotta"
                      : "border-primary/15 bg-white text-primary/60",
                  )}
                >
                  {sub.nome}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
