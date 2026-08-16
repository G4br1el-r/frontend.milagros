import { Sparkles, TrendingUp } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { PRODUCT_BADGE_LABEL, type ProductBadge } from "../product.types";

const BADGE_ICON: Record<
  ProductBadge,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  novidade: Sparkles,
  "mais-vendido": TrendingUp,
};

const BADGE_STYLE: Record<ProductBadge, string> = {
  novidade: "border-white/50 bg-cream/95 text-primary",
  "mais-vendido":
    "border-white/30 bg-linear-to-b from-gold-light to-gold text-primary-darkest",
};

export function ProductBadgeTag({ badge }: { badge: ProductBadge }) {
  const Icon = BADGE_ICON[badge];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3.5 pl-3 text-[10px] font-bold tracking-[0.14em] uppercase shadow-lg shadow-primary-darkest/25 backdrop-blur-md ${BADGE_STYLE[badge]}`}
    >
      <Icon className="size-3 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      {PRODUCT_BADGE_LABEL[badge]}
    </span>
  );
}
