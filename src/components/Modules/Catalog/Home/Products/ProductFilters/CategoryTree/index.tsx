"use client";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCategoryTree } from "../use-category-tree";
import { useProductFiltersWithScroll } from "../use-filters-with-scroll";
import { CategoryOptionSkeleton } from "./CategoryOptionSkeleton";

export function CategoryTree() {
  const { principais, isLoading } = useCategoryTree();
  const { categoria, subcategoria, setCategoria, setSubcategoria } =
    useProductFiltersWithScroll();
  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <CategoryOptionSkeleton />
        <CategoryOptionSkeleton />
        <CategoryOptionSkeleton />
      </div>
    );
  }
  const hasAnySelection = Boolean(categoria || subcategoria);
  return (
    <ul className="flex flex-col gap-0.5">
      <li>
        <button
          type="button"
          onClick={() => setCategoria(null)}
          aria-pressed={!hasAnySelection}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200",
            hasAnySelection
              ? "text-primary/60 hover:bg-primary/5 hover:text-primary"
              : "bg-terracotta/10 font-semibold text-terracotta",
          )}
        >
          <span className="flex-1">Todos os produtos</span>
          {!hasAnySelection && (
            <Check className="size-4 shrink-0" strokeWidth={2.5} />
          )}
        </button>
      </li>
      {principais.map((category) => {
        const subs = category.subcategorias;
        const selectedHere = categoria === category.nome;
        const childSelected = subs.some((sub) => sub.nome === subcategoria);
        const expanded = selectedHere || childSelected;
        return (
          <li key={category.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => setCategoria(category.nome)}
              aria-pressed={selectedHere}
              aria-expanded={subs.length > 0 ? expanded : undefined}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200",
                selectedHere
                  ? "bg-terracotta/10 font-semibold text-terracotta"
                  : childSelected
                    ? "font-semibold text-terracotta"
                    : "font-medium text-primary/80 hover:bg-primary/5 hover:text-primary",
              )}
            >
              <span className="flex-1 truncate">{category.nome}</span>
              {selectedHere && (
                <Check className="size-4 shrink-0" strokeWidth={2.5} />
              )}
              {subs.length > 0 && !selectedHere && (
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-primary/30 transition-transform duration-200",
                    !expanded && "-rotate-90",
                  )}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </button>
            {subs.length > 0 && expanded && (
              <ul className="mt-0.5 mb-1 ml-3 flex flex-col gap-0.5 border-l-2 border-terracotta/20 pl-2">
                {subs.map((sub) => {
                  const selected = subcategoria === sub.nome;
                  return (
                    <li key={sub.id}>
                      <button
                        type="button"
                        onClick={() => setSubcategoria(sub.nome)}
                        aria-pressed={selected}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors duration-200",
                          selected
                            ? "bg-terracotta/10 font-medium text-terracotta"
                            : "text-primary/65 hover:bg-primary/5 hover:text-primary",
                        )}
                      >
                        <span className="flex-1 truncate">{sub.nome}</span>
                        {selected && (
                          <Check
                            className="size-3.5 shrink-0"
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
