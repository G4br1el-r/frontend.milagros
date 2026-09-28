import { cn } from "@/lib/utils/cn";

export function fieldInputClassName(invalid?: boolean): string {
  return cn(
    "h-11 w-full rounded-lg border bg-white px-3.5 text-base text-primary transition-colors duration-200 outline-none placeholder:text-primary/35",
    "focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25",
    "disabled:cursor-not-allowed disabled:bg-primary/5 disabled:text-primary/45",
    invalid
      ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-200"
      : "border-primary/15",
  );
}
