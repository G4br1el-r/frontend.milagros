import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { PRICE_RANGE_MIN_GAP_RATIO } from "./price-range.constants";

interface PriceBounds {
  precoMinimo: number;
  precoMaximo: number;
}

export function usePriceRangeSlider(bounds: PriceBounds) {
  const { precoMin, precoMax, setPrecoRange } = useProductFiltersUrl();

  const min = bounds.precoMinimo;
  const max = bounds.precoMaximo;
  const minGap = (max - min) * PRICE_RANGE_MIN_GAP_RATIO || 0.01;

  const selectedMin = precoMin ?? min;
  const selectedMax = precoMax ?? max;

  const setMin = (value: number) => {
    const clamped = Math.min(Math.max(value, min), selectedMax - minGap);
    setPrecoRange(clamped, selectedMax);
  };

  const setMax = (value: number) => {
    const clamped = Math.max(Math.min(value, max), selectedMin + minGap);
    setPrecoRange(selectedMin, clamped);
  };

  const range = max - min || 1;
  const startPct = ((selectedMin - min) / range) * 100;
  const endPct = ((selectedMax - min) / range) * 100;

  return {
    min,
    max,
    selectedMin,
    selectedMax,
    setMin,
    setMax,
    startPct,
    endPct,
  };
}
