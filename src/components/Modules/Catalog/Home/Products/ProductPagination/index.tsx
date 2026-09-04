"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getPaginationRange } from "./get-pagination-range";
import { PAGINATION_ELLIPSIS_SYMBOL } from "./pagination.constants";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationRange(page, totalPages);

  return (
    <nav
      aria-label="Paginação de produtos"
      className="mt-10 flex items-center justify-center gap-1.5 sm:mt-14"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/10 transition-colors duration-200",
          page === 1
            ? "cursor-not-allowed text-primary/30"
            : "cursor-pointer text-primary/60 hover:border-primary/25 hover:text-primary",
        )}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>

      {items.map((item) =>
        item.type === "ellipsis" ? (
          <span
            key={`ellipsis-${item.key}`}
            className="flex size-9 shrink-0 items-center justify-center text-sm text-primary/40"
          >
            {PAGINATION_ELLIPSIS_SYMBOL}
          </span>
        ) : (
          <button
            type="button"
            key={item.page}
            onClick={() => onPageChange(item.page)}
            aria-current={item.page === page ? "page" : undefined}
            className={cn(
              "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors duration-200",
              item.page === page
                ? "bg-linear-to-b from-gold-light to-gold text-primary-darkest"
                : "text-primary/60 hover:bg-primary/5 hover:text-primary",
            )}
          >
            {item.page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Próxima página"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/10 transition-colors duration-200",
          page === totalPages
            ? "cursor-not-allowed text-primary/30"
            : "cursor-pointer text-primary/60 hover:border-primary/25 hover:text-primary",
        )}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  );
}
