"use client";

import { Search } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function ProductSearch() {
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div className="mx-auto mb-12 w-full max-w-xl px-5 sm:mb-16 sm:px-8">
      <label htmlFor={id} className="sr-only">
        Buscar produto
      </label>

      <div
        className={cn(
          "group relative flex items-center overflow-hidden rounded-full border bg-white/70 backdrop-blur-sm transition-colors duration-300",
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
          placeholder="Buscar por nome, santo ou devoção…"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-4 pr-5 pl-13 text-sm text-primary placeholder:text-primary/40 focus:outline-none sm:py-4.5 sm:text-base"
        />

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-gold-light/10 via-transparent to-gold-light/10 opacity-0 transition-opacity duration-500",
            focused && "opacity-100",
          )}
        />
      </div>
    </div>
  );
}
