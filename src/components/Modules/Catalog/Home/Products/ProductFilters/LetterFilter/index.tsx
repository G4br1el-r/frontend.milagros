"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function LetterFilter() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {LETTERS.map((letter) => (
        <button
          key={letter}
          type="button"
          onClick={() =>
            setSelected((prev) => (prev === letter ? null : letter))
          }
          className={cn(
            "flex aspect-square cursor-pointer items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-200",
            selected === letter
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
