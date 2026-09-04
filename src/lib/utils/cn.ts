import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Cores da marca declaradas no `@theme` de globals.css. O tailwind-merge nao
 * as conhece por padrao, entao sem esta lista ele trata `bg-cream` e
 * `bg-primary` como grupos distintos e deixa as duas classes sobreviverem.
 * As demais cores do tema (primary, muted, sidebar-*, chart-*) ja fazem parte
 * do vocabulario padrao do tailwind-merge e nao precisam ser repetidas aqui.
 */
const BRAND_COLORS = [
  "cream",
  "gold",
  "gold-light",
  "primary-dark",
  "primary-darkest",
  "terracotta",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [...BRAND_COLORS],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
