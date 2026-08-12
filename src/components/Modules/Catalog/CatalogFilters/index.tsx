import { FilterPanelContent } from "./FilterPanelContent";
import { PromoBanners } from "./PromoBanners";

export function CatalogFilters() {
  return (
    <aside className="hidden w-full flex-col gap-6 lg:sticky lg:top-4 lg:flex lg:h-fit lg:self-start">
      <div className="rounded-2xl bg-primary-dark p-6">
        <FilterPanelContent />
      </div>

      <PromoBanners />
    </aside>
  );
}
