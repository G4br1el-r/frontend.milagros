import { FadeIn } from "@/components/motion/fade-in";
import {
  CATALOG_PRICE_RANGE,
  CATALOG_PRICE_RANGE_FILLED_PERCENT,
} from "@/lib/utils/constants";

export function PriceRangeSlider() {
  return (
    <FadeIn distance={8} className="flex flex-col gap-3">
      <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
        Faixa de preço
      </span>

      <div className="relative h-1 w-full rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gold"
          style={{ width: `${CATALOG_PRICE_RANGE_FILLED_PERCENT}%` }}
        />
        <div className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full bg-gold" />
        <div
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-gold"
          style={{ left: `${CATALOG_PRICE_RANGE_FILLED_PERCENT}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-white/50">
        <span>R$ {CATALOG_PRICE_RANGE.min}</span>
        <span>R$ {CATALOG_PRICE_RANGE.max}</span>
      </div>
    </FadeIn>
  );
}
