"use client";
import { Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useProductFiltersUrl } from "@/lib/query-state/use-product-filters-url";
import { cn } from "@/lib/utils/cn";
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_CHARS,
} from "../ProductFilters/filters.constants";
export function ProductSearch() {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const { termo, setTermo } = useProductFiltersUrl();
  const [draft, setDraft] = useState(termo);
  const debouncedDraft = useDebouncedValue(draft, SEARCH_DEBOUNCE_MS);
  const setTermoRef = useRef(setTermo);
  setTermoRef.current = setTermo;
  useEffect(() => {
    const trimmed = debouncedDraft.trim();
    if (trimmed.length > 0 && trimmed.length < SEARCH_MIN_CHARS) return;
    setTermoRef.current(trimmed);
  }, [debouncedDraft]);
  return (
    <div
      id="catalog-search"
      className="relative z-10 mx-auto -mt-7 mb-12 w-full max-w-2xl scroll-mt-24 px-5 sm:-mt-8 sm:mb-16 sm:px-8 lg:-mt-9"
    >
      <label htmlFor={id} className="sr-only">
        Buscar produto
      </label>
      <div
        className={cn(
          "group relative flex items-center overflow-hidden rounded-full border bg-white shadow-[0_20px_50px_-20px_rgba(30,20,10,0.35)] transition-colors duration-300",
          focused ? "border-gold" : "border-primary/15 hover:border-primary/30",
        )}
      >
        <Search
          className={cn(
            "pointer-events-none absolute left-5 size-4.5 shrink-0 transition-colors duration-300",
            focused ? "text-gold" : "text-primary/40",
          )}
          strokeWidth={2}
        />
        <input
          id={id}
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Buscar por nome, santo ou devoção…"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-4 pr-5 pl-13 text-sm text-primary placeholder:text-primary/40 focus:outline-none sm:py-4.5 sm:text-base"
        />
        <button
          type="button"
          aria-label="Buscar"
          onClick={() => setTermoRef.current(draft.trim())}
          className="mr-1.5 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-gold-light to-gold text-primary-darkest transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 sm:size-11"
        >
          <Search className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
