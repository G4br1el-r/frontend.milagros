import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

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
