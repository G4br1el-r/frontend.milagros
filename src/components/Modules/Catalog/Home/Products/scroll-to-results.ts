import { PAGINATION_SCROLL_TARGET_ID } from "./ProductPagination/pagination.constants";

export function scrollToResultsTop() {
  requestAnimationFrame(() => {
    document
      .getElementById(PAGINATION_SCROLL_TARGET_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
