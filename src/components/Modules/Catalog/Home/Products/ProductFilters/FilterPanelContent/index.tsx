import { CategoryFilterGroup } from "../CategoryFilterGroup";
import { FilterActions } from "../FilterActions";
import { FilterGroup } from "../FilterGroup";
import { LetterFilter } from "../LetterFilter";
import { PriceRange } from "../PriceRange";

export function FilterPanelContent() {
  return (
    <div className="flex flex-col gap-8">
      <FilterGroup title="Letra Inicial">
        <LetterFilter />
      </FilterGroup>

      <div className="h-px w-full bg-primary/10" />

      <FilterGroup title="Categoria">
        <CategoryFilterGroup />
      </FilterGroup>

      <div className="h-px w-full bg-primary/10" />

      <FilterGroup title="Faixa de Preço">
        <PriceRange />
      </FilterGroup>

      <FilterActions />
    </div>
  );
}
