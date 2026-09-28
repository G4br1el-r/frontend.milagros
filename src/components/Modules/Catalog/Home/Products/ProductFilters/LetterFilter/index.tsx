"use client";
import { cn } from "@/lib/utils/cn";
import { ALPHABET_LETTERS } from "../filters.constants";
import { useProductLetters } from "../use-filter-options";
import { useProductFiltersWithScroll } from "../use-filters-with-scroll";
import { LetterFilterSkeleton } from "./LetterFilterSkeleton";
export function LetterFilter() {
  const { letra, setLetra } = useProductFiltersWithScroll();
  const { data: letters, isLoading } = useProductLetters();
  if (isLoading) {
    return <LetterFilterSkeleton />;
  }
  const countByLetter = new Map(
    letters?.map((item) => [item.letra.toUpperCase(), item.totalProdutos]),
  );
  const availableLetters = ALPHABET_LETTERS.filter(
    (letter) => (countByLetter.get(letter) ?? 0) > 0,
  );
  if (availableLetters.length === 0) return null;
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {availableLetters.map((letter) => (
        <button
          key={letter}
          type="button"
          onClick={() => setLetra(letter)}
          aria-pressed={letra === letter}
          className={cn(
            "flex aspect-square cursor-pointer items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-200",
            letra === letter
              ? "border-terracotta bg-terracotta text-cream"
              : "border-primary/12 bg-white text-primary/70 hover:border-primary/30 hover:text-primary",
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
