import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import type { Product } from "../product.types";
import { PAGINATION_SCROLL_TARGET_ID } from "./pagination.constants";

function scrollToResultsTop() {
  requestAnimationFrame(() => {
    document
      .getElementById(PAGINATION_SCROLL_TARGET_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function usePagination(items: Product[]) {
  const {
    page: requestedPage,
    pageSize,
    setPage: setUrlPage,
  } = useProductFiltersUrl();
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    page,
    setPage: (next: number) => {
      const clamped = Math.max(next, 1);
      if (clamped !== page) {
        setUrlPage(clamped);
        scrollToResultsTop();
      }
    },
    totalPages,
    pageItems,
  };
}
