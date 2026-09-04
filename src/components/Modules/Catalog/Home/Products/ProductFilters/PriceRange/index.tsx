"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useProductPriceRange } from "../use-filter-options";
import { PriceRangeSkeleton } from "./PriceRangeSkeleton";
import { PRICE_RANGE_STEP } from "./price-range.constants";
import { usePriceRangeSlider } from "./use-price-range-slider";

const RANGE_INPUT_CLASS =
  "pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-terracotta [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-terracotta [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm";

const PRICE_INPUT_CLASS =
  "field-sizing-content min-w-0 appearance-none text-base tabular-nums outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export function PriceRange() {
  const { data: bounds, isLoading } = useProductPriceRange();

  if (isLoading || !bounds) {
    return <PriceRangeSkeleton />;
  }

  return <PriceRangeSlider bounds={bounds} />;
}

function PriceRangeSlider({
  bounds,
}: {
  bounds: { precoMinimo: number; precoMaximo: number };
}) {
  const minId = useId();
  const maxId = useId();
  const {
    min,
    max,
    selectedMin,
    selectedMax,
    setMin,
    setMax,
    startPct,
    endPct,
  } = usePriceRangeSlider(bounds);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative h-4.5 w-full">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary/10" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-terracotta"
          style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={PRICE_RANGE_STEP}
          value={selectedMin}
          onChange={(event) => setMin(Number(event.target.value))}
          aria-label="Preço mínimo"
          className={cn(RANGE_INPUT_CLASS, "z-20")}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={PRICE_RANGE_STEP}
          value={selectedMax}
          onChange={(event) => setMax(Number(event.target.value))}
          aria-label="Preço máximo"
          className={cn(RANGE_INPUT_CLASS, "z-10")}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor={minId} className="text-xs text-primary/55">
            Mínimo
          </label>
          <span className="flex items-center gap-1 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary">
            <span className="shrink-0 text-primary/40">R$</span>
            <PriceTextInput
              id={minId}
              value={selectedMin}
              onCommit={setMin}
              className={PRICE_INPUT_CLASS}
            />
          </span>
        </div>

        <span className="mt-5 h-px w-3 shrink-0 bg-primary/20" />

        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor={maxId} className="text-xs text-primary/55">
            Máximo
          </label>
          <span className="flex items-center gap-1 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary">
            <span className="shrink-0 text-primary/40">R$</span>
            <PriceTextInput
              id={maxId}
              value={selectedMax}
              onCommit={setMax}
              className={PRICE_INPUT_CLASS}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function formatDraft(value: number) {
  return value.toFixed(2).replace(".", ",");
}

function parseDraft(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return Number(normalized);
}

interface PriceTextInputProps {
  id: string;
  value: number;
  onCommit: (value: number) => void;
  className?: string;
}

function PriceTextInput({
  id,
  value,
  onCommit,
  className,
}: PriceTextInputProps) {
  const [draft, setDraft] = useState(() => formatDraft(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) setDraft(formatDraft(value));
  }, [value, isFocused]);

  const commit = () => {
    setIsFocused(false);
    const parsed = parseDraft(draft);
    if (Number.isFinite(parsed)) {
      onCommit(parsed);
    } else {
      setDraft(formatDraft(value));
    }
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      value={draft}
      onFocus={() => setIsFocused(true)}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      className={className}
    />
  );
}
