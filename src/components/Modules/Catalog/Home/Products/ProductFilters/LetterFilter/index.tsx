"use client";

import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { cn } from "@/lib/utils/cn";
import { ALPHABET_LETTERS } from "../filters.constants";
import { useProductLetters } from "../use-filter-options";
import { LetterFilterSkeleton } from "./LetterFilterSkeleton";

export function LetterFilter() {
  const { letra, setLetra } = useProductFiltersUrl();
  const { data: letters, isLoading } = useProductLetters();

  if (isLoading) {
    return <LetterFilterSkeleton />;
  }

  const countByLetter = new Map(
    letters?.map((item) => [item.letra.toUpperCase(), item.totalProdutos]),
  );

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {ALPHABET_LETTERS.map((letter) => {
        const hasProducts = (countByLetter.get(letter) ?? 0) > 0;

        return (
          <button
            key={letter}
            type="button"
            disabled={!hasProducts}
            onClick={() => setLetra(letter)}
            aria-pressed={letra === letter}
            className={cn(
              "flex aspect-square items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-200",
              !hasProducts &&
                "cursor-not-allowed border-primary/6 bg-primary/3 text-primary/25",
              hasProducts &&
                letra === letter &&
                "cursor-pointer border-terracotta bg-terracotta text-cream",
              hasProducts &&
                letra !== letter &&
                "cursor-pointer border-primary/12 bg-white text-primary/70 hover:border-primary/30 hover:text-primary",
            )}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
