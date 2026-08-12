import { CATALOG_AROMAS, CATALOG_PRODUCT_TYPES } from "@/lib/utils/constants";
import { CategoryList } from "./CategoryList";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import { PriceRangeSlider } from "./PriceRangeSlider";

export function FilterPanelContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">Categorias</span>
        <CategoryList />
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="flex flex-col gap-6">
        <span className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">Filtrar por</span>

        <PriceRangeSlider />
        <FilterCheckboxGroup title="Tipo de produto" options={CATALOG_PRODUCT_TYPES} />
        <FilterCheckboxGroup title="Aroma" options={CATALOG_AROMAS} />

        <ClearFiltersButton />
      </div>
    </div>
  );
}
