"use client";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { formatPrice } from "../../product.types";
import { CategoryTree } from "../CategoryTree";
import { FilterActions } from "../FilterActions";
import { FilterGroup } from "../FilterGroup";
import { LetterFilter } from "../LetterFilter";
import { PriceRange } from "../PriceRange";

interface FilterPanelContentProps {
  withCategories?: boolean;
}
export function FilterPanelContent({
  withCategories = true,
}: FilterPanelContentProps) {
  const { letra, categoria, subcategoria, precoMin, precoMax } =
    useProductFiltersUrl();
  const priceBadge =
    precoMin !== undefined || precoMax !== undefined
      ? precoMin !== undefined && precoMax !== undefined
        ? `${formatPrice(precoMin)} – ${formatPrice(precoMax)}`
        : precoMin !== undefined
          ? `A partir de ${formatPrice(precoMin)}`
          : `Até ${formatPrice(precoMax ?? 0)}`
      : null;
  return (
    <div className="flex flex-col gap-7">
      {withCategories && (
        <>
          <FilterGroup title="Categoria" badge={subcategoria ?? categoria}>
            <CategoryTree />
          </FilterGroup>
          <div className="h-px w-full bg-primary/10" />
        </>
      )}
      <FilterGroup title="Letra Inicial" badge={letra}>
        <LetterFilter />
      </FilterGroup>
      <div className="h-px w-full bg-primary/10" />
      <FilterGroup title="Faixa de Preço" badge={priceBadge}>
        <PriceRange />
      </FilterGroup>
      <FilterActions />
    </div>
  );
}
