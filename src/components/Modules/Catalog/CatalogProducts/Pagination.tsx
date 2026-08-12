import { FadeIn } from "@/components/motion/fade-in";
import { CATALOG_CURRENT_PAGE, CATALOG_TOTAL_PAGES } from "@/lib/utils/constants";
import { iconMap } from "@/lib/utils/iconsMap";

const ChevronLeft = iconMap.chevronLeft;
const ChevronRight = iconMap.chevronRight;

const pages = Array.from({ length: CATALOG_TOTAL_PAGES }, (_, index) => index + 1);

export function Pagination() {
  return (
    <FadeIn distance={12} className="flex w-full items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={CATALOG_CURRENT_PAGE === 1}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text disabled:pointer-events-none disabled:opacity-40 sm:size-9"
      >
        <ChevronLeft className="size-4" strokeWidth={1.75} />
      </button>

      <div className="scrollbar-none flex min-w-0 items-center gap-1.5 overflow-x-auto sm:gap-2">
        {pages.map((page) => {
          const isActive = page === CATALOG_CURRENT_PAGE;

          return (
            <button
              key={page}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-sm transition-colors sm:size-9 ${
                isActive
                  ? "bg-primary text-background"
                  : "text-text-muted hover:bg-surface hover:text-text"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Próxima página"
        disabled={CATALOG_CURRENT_PAGE === CATALOG_TOTAL_PAGES}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text disabled:pointer-events-none disabled:opacity-40 sm:size-9"
      >
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </button>
    </FadeIn>
  );
}
