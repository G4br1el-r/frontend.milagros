import { FilterActions } from "../FilterActions";
import { FilterCheckbox } from "../FilterCheckbox";
import { FilterGroup } from "../FilterGroup";
import { CATEGORY_FILTERS, DEVOTION_FILTERS } from "../filters.data";
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
        <div className="flex flex-col">
          {CATEGORY_FILTERS.map((option, index) => (
            <FilterCheckbox
              key={option.label}
              label={option.label}
              count={option.count}
              defaultChecked={index === 0}
            />
          ))}
        </div>
      </FilterGroup>

      <div className="h-px w-full bg-primary/10" />

      <FilterGroup title="Faixa de Preço">
        <PriceRange />
      </FilterGroup>

      <div className="h-px w-full bg-primary/10" />

      <FilterGroup title="Devoção">
        <div className="flex flex-col">
          {DEVOTION_FILTERS.map((option) => (
            <FilterCheckbox
              key={option.label}
              label={option.label}
              count={option.count}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterActions />
    </div>
  );
}
