import { PackageX } from "lucide-react";
import { PRODUCT_OUT_OF_STOCK_LABEL } from "../product.constants";

export function ProductStockTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-primary-darkest/90 py-1.5 pr-3.5 pl-3 text-[10px] font-bold tracking-[0.14em] text-cream uppercase shadow-lg shadow-primary-darkest/25 backdrop-blur-md">
      <PackageX
        className="size-3 shrink-0"
        strokeWidth={2.5}
        aria-hidden="true"
      />
      {PRODUCT_OUT_OF_STOCK_LABEL}
    </span>
  );
}
