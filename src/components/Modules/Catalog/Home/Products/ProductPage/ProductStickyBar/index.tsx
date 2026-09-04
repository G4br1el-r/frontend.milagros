"use client";

import { AnimatePresence, motion } from "motion/react";
import { type RefObject, useEffect, useState } from "react";
import { ProductCta } from "../../ProductCta";
import { formatPrice, type Product } from "../../product.types";

interface ProductStickyBarProps {
  product: Product;
  /** CTA principal da página — a barra só entra quando ele sai do viewport. */
  anchorRef: RefObject<HTMLDivElement | null>;
}

/**
 * Barra de compra que acompanha o scroll no mobile. Só aparece depois que o
 * CTA do painel sai da tela — enquanto ele está visível, duas ações iguais
 * empilhadas seriam ruído. IntersectionObserver em vez de listener de
 * scroll: não roda em toda a rolagem.
 */
export function ProductStickyBar({
  product,
  anchorRef,
}: ProductStickyBarProps) {
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
        <motion.div
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
              <span className="font-sans text-xl leading-none font-semibold tabular-nums text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="ml-auto w-44 shrink-0">
              <ProductCta
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
