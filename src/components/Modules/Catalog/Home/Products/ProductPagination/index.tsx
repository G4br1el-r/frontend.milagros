import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const PAGES = [1, 2, 3, 4, 5];
const CURRENT_PAGE = 1;

export function ProductPagination() {
  return (
    <nav
      aria-label="Paginação de produtos"
      className="mt-10 flex items-center justify-center gap-2 sm:mt-14"
    >
      <span className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-primary/10 text-primary/30">
        <ChevronLeft className="size-4" strokeWidth={2} />
      </span>

      {PAGES.map((page) => (
        <span
          key={page}
          aria-current={page === CURRENT_PAGE ? "page" : undefined}
          className={cn(
            "flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors duration-200",
            page === CURRENT_PAGE
              ? "bg-linear-to-b from-gold-light to-gold text-primary-darkest"
              : "text-primary/60 hover:bg-primary/5 hover:text-primary",
          )}
        >
          {page}
        </span>
      ))}

      <span className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/10 text-primary/60 transition-colors duration-200 hover:border-primary/25 hover:text-primary">
        <ChevronRight className="size-4" strokeWidth={2} />
      </span>
    </nav>
  );
}
