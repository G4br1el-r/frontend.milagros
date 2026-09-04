import { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import {
  PRICE_RANGE_DEBOUNCE_MS,
  PRICE_RANGE_MIN_GAP_RATIO,
} from "./price-range.constants";

interface PriceBounds {
  precoMinimo: number;
  precoMaximo: number;
}

export function usePriceRangeSlider(bounds: PriceBounds) {
  const { precoMin, precoMax, setPrecoRange } = useProductFiltersUrl();

  const min = bounds.precoMinimo;
  const max = bounds.precoMaximo;
  const minGap = (max - min) * PRICE_RANGE_MIN_GAP_RATIO || 0.01;

  const [draftMin, setDraftMin] = useState(precoMin ?? min);
  const [draftMax, setDraftMax] = useState(precoMax ?? max);
  const debouncedMin = useDebouncedValue(draftMin, PRICE_RANGE_DEBOUNCE_MS);
  const debouncedMax = useDebouncedValue(draftMax, PRICE_RANGE_DEBOUNCE_MS);

  const hasInteracted = useRef(false);

  const setPrecoRangeRef = useRef(setPrecoRange);
  setPrecoRangeRef.current = setPrecoRange;

  const boundsRef = useRef({ min, max });
  boundsRef.current = { min, max };

  useEffect(() => {
    if (!hasInteracted.current) return;
    setPrecoRangeRef.current(debouncedMin, debouncedMax);
  }, [debouncedMin, debouncedMax]);

  useEffect(() => {
    setDraftMin(precoMin ?? boundsRef.current.min);
    setDraftMax(precoMax ?? boundsRef.current.max);
  }, [precoMin, precoMax]);

  const setMin = (value: number) => {
    hasInteracted.current = true;
    const clamped = Math.min(Math.max(value, min), draftMax - minGap);
    setDraftMin(clamped);
  };

  const setMax = (value: number) => {
    hasInteracted.current = true;
    const clamped = Math.max(Math.min(value, max), draftMin + minGap);
    setDraftMax(clamped);
  };

  const range = max - min || 1;
  const startPct = ((draftMin - min) / range) * 100;
  const endPct = ((draftMax - min) / range) * 100;

  return {
    min,
    max,
    selectedMin: draftMin,
    selectedMax: draftMax,
    setMin,
    setMax,
    startPct,
    endPct,
  };
}
