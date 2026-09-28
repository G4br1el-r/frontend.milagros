import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { scrollToResultsTop } from "../scroll-to-results";

export function usePaginationNavigation(page: number) {
  const { setPage: setUrlPage } = useProductFiltersUrl();
  return {
    setPage: (next: number) => {
      const clamped = Math.max(next, 1);
      if (clamped !== page) {
        setUrlPage(clamped);
        scrollToResultsTop();
      }
    },
  };
}
