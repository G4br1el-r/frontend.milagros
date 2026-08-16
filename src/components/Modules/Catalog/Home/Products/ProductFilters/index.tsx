import { FilterDrawer } from "./FilterDrawer";
import { FilterPanelContent } from "./FilterPanelContent";
import { FilterSidebar } from "./FilterSidebar";

interface ProductFiltersProps {
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}

export function ProductFilters({
  desktopOnly,
  mobileOnly,
}: ProductFiltersProps) {
  return (
    <>
      {!mobileOnly && <FilterSidebar />}
      {!desktopOnly && (
        <FilterDrawer>
          <FilterPanelContent />
        </FilterDrawer>
      )}
    </>
  );
}
