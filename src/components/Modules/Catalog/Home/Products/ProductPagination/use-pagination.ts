import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { PAGINATION_SCROLL_TARGET_ID } from "./pagination.constants";

function scrollToResultsTop() {
  requestAnimationFrame(() => {
    document
      .getElementById(PAGINATION_SCROLL_TARGET_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

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
