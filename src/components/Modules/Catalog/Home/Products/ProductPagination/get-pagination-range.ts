import { PAGINATION_SIBLING_COUNT } from "./pagination.constants";

export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: "start" | "end" };

function pageItem(value: number): PaginationItem {
  return { type: "page", page: value };
}

function ellipsis(key: "start" | "end"): PaginationItem {
  return { type: "ellipsis", key };
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  const totalVisible = PAGINATION_SIBLING_COUNT * 2 + 5;

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, index) =>
      pageItem(index + 1),
    );
  }

  const leftSibling = Math.max(currentPage - PAGINATION_SIBLING_COUNT, 1);
  const rightSibling = Math.min(
    currentPage + PAGINATION_SIBLING_COUNT,
    totalPages,
  );

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 5 }, (_, index) =>
      pageItem(index + 1),
    );
    return [...leftRange, ellipsis("end"), pageItem(totalPages)];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from({ length: 5 }, (_, index) =>
      pageItem(totalPages - 4 + index),
    );
    return [pageItem(1), ellipsis("start"), ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => pageItem(leftSibling + index),
  );
  return [
    pageItem(1),
    ellipsis("start"),
    ...middleRange,
    ellipsis("end"),
    pageItem(totalPages),
  ];
}
