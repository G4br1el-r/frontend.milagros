import { PRICE_BOUNDS } from "../filters.data";

export function PriceRange() {
  const { min, max, selectedMin, selectedMax } = PRICE_BOUNDS;
  const startPct = ((selectedMin - min) / (max - min)) * 100;
  const endPct = ((selectedMax - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-5">
      <div className="relative h-1.5 w-full rounded-full bg-primary/10">
        <div
          className="absolute h-full rounded-full bg-terracotta"
          style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-4.5 -translate-y-1/2 rounded-full border-2 border-terracotta bg-white shadow-sm"
          style={{ left: `calc(${startPct}% - 9px)` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-4.5 -translate-y-1/2 rounded-full border-2 border-terracotta bg-white shadow-sm"
          style={{ left: `calc(${endPct}% - 9px)` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs text-primary/55">Mínimo</span>
          <span className="flex items-center gap-1.5 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary">
            <span className="text-primary/40">R$</span>
            <span className="tabular-nums">{selectedMin}</span>
          </span>
        </div>

        <span className="mt-5 h-px w-3 shrink-0 bg-primary/20" />

        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs text-primary/55">Máximo</span>
          <span className="flex items-center gap-1.5 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary">
            <span className="text-primary/40">R$</span>
            <span className="tabular-nums">{selectedMax}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
