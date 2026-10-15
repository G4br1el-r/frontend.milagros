"use client";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { type RefObject, useEffect, useState } from "react";
import { ProductCta } from "../../ProductCta";
import {
  formatPrice,
  type Product,
  type ProductVariant,
} from "../../product.types";
import { toCartProduct } from "../../product.variants";

interface ProductStickyBarProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  anchorRef: RefObject<HTMLDivElement | null>;
}
export function ProductStickyBar({
  product,
  selectedVariant,
  anchorRef,
}: ProductStickyBarProps) {
  const cartProduct = toCartProduct(product, selectedVariant);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorRef]);
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-cream/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-4">
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs text-primary/60">
                {product.name}
              </span>
              {cartProduct.variantName && (
                <span className="truncate text-xs font-medium text-primary">
                  {cartProduct.variantName}
                </span>
              )}
              <span className="font-sans text-xl leading-none font-semibold tabular-nums text-primary">
                {formatPrice(cartProduct.price)}
              </span>
            </div>
            <div className="ml-auto w-44 shrink-0">
              <ProductCta item={cartProduct} />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
