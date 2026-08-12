import { FadeIn } from "@/components/motion/fade-in";
import {
  CATALOG_DEFAULT_SORT_ID,
  CATALOG_RESULTS_COUNT,
  CATALOG_SORT_OPTIONS,
} from "@/lib/utils/constants";
import { iconMap } from "@/lib/utils/iconsMap";

const ChevronDown = iconMap.chevronDown;
const Grid = iconMap.grid;
const List = iconMap.list;

export function ProductsToolbar() {
  return (
    <FadeIn
      direction="down"
      distance={8}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="text-sm text-text-muted">
        {CATALOG_RESULTS_COUNT} produtos encontrados
      </span>

      <div className="flex flex-wrap items-center gap-3">
        <span className="shrink-0 text-sm text-text-muted">Ordenar por:</span>

        <div className="relative min-w-0">
          <select
            defaultValue={CATALOG_DEFAULT_SORT_ID}
            className="w-full min-w-0 appearance-none rounded-lg border border-border bg-surface py-2 pr-9 pl-3 text-sm text-text outline-none"
          >
            {CATALOG_SORT_OPTIONS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-text-muted" />
        </div>

        <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-border">
          <button
            type="button"
            aria-label="Visualização em grade"
            className="flex items-center justify-center bg-primary p-2 text-background"
          >
            <Grid className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Visualização em lista"
            className="flex items-center justify-center bg-surface p-2 text-text-muted transition-colors hover:text-text"
          >
            <List className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
