import { ALPHABET_LETTERS } from "../filters.constants";
export function LetterFilterSkeleton() {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {ALPHABET_LETTERS.map((letter) => (
        <div
          key={letter}
          className="aspect-square animate-pulse rounded-lg bg-primary/10"
        />
      ))}
    </div>
  );
}
