"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Star, X } from "lucide-react";
import {
  motion,
  type PanInfo,
  useAnimation,
  useDragControls,
} from "motion/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductDetailStore } from "@/lib/stores/product-detail";
import { ProductStockTag } from "../ProductCard/ProductStockTag";
import { ProductCta } from "../ProductCta";
import { formatPrice } from "../product.types";
import { ProductGallery } from "./ProductGallery";

const DRAG_CLOSE_DISTANCE = 120;
const DRAG_CLOSE_VELOCITY = 500;

export function ProductDetailModal() {
  const storeProduct = useProductDetailStore((state) => state.product);
  const close = useProductDetailStore((state) => state.close);

  const [product, setProduct] = useState(storeProduct);
  const sheetAnimation = useAnimation();
  const dragControls = useDragControls();

  useEffect(() => {
    if (storeProduct) {
      setProduct(storeProduct);
      sheetAnimation.set({ y: 0 });
    }
  }, [storeProduct, sheetAnimation]);

  const handleDragEnd = (
    _event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    const shouldClose =
      info.offset.y > DRAG_CLOSE_DISTANCE ||
      info.velocity.y > DRAG_CLOSE_VELOCITY;

    if (shouldClose) {
      close();
    } else {
      sheetAnimation.start({
        y: 0,
        transition: { type: "spring", stiffness: 400, damping: 35 },
      });
    }
  };

  return (
    <Dialog
      open={storeProduct !== null}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogPortal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-primary-darkest/60 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <DialogPrimitive.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[94vh] overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl outline-none transition-all duration-200 ease-out data-ending-style:translate-y-8 data-ending-style:opacity-0 data-starting-style:translate-y-8 data-starting-style:opacity-0 sm:top-1/2 sm:left-1/2 sm:h-[85vh] sm:max-h-208 sm:w-[calc(100%-3rem)] sm:max-w-5xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2.5rem] sm:data-ending-style:translate-x-[-50%] sm:data-ending-style:translate-y-[calc(-50%+1rem)] sm:data-ending-style:scale-97 sm:data-starting-style:translate-x-[-50%] sm:data-starting-style:translate-y-[calc(-50%+1rem)] sm:data-starting-style:scale-97">
          {product && (
            <motion.div
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              animate={sheetAnimation}
              onDragEnd={handleDragEnd}
              className="relative flex h-full max-h-[94vh] flex-col sm:max-h-208"
            >
              <div
                onPointerDown={(event) => dragControls.start(event)}
                className="flex shrink-0 touch-none justify-center py-2.5 sm:hidden"
              >
                <span className="h-1.5 w-10 rounded-full bg-primary/20" />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="absolute top-5 right-5 z-30 flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary-darkest/70 text-cream backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-primary-darkest"
              >
                <X className="size-4.5" strokeWidth={2} />
              </button>

              <div className="grid flex-1 overflow-y-auto sm:grid-cols-[1.1fr_1fr] sm:overflow-hidden">
                <div className="relative flex bg-primary-darkest p-3 sm:h-full sm:p-6">
                  <ProductGallery images={product.images} alt={product.name} />

                  {!product.inStock && (
                    <div className="absolute top-6 left-6 z-10">
                      <ProductStockTag />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-5 p-6 sm:overflow-y-auto sm:p-10">
                  <div className="flex items-center justify-between gap-3">
                    {product.category && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/12 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-primary-dark uppercase">
                        {product.category}
                      </span>
                    )}

                    {product.rating !== null && (
                      <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs text-primary/70">
                        <Star
                          className="size-3.5 fill-gold text-gold"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-primary">
                          {product.rating.toFixed(1)}
                        </span>
                        <span>({product.reviewCount})</span>
                      </span>
                    )}
                  </div>

                  <DialogTitle className="font-display text-3xl leading-tight text-primary sm:text-4xl">
                    {product.name}
                  </DialogTitle>

                  <DialogDescription className="text-sm leading-relaxed whitespace-pre-line text-primary/70">
                    {product.description}
                  </DialogDescription>

                  {product.attributes.length > 0 && (
                    <dl className="grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl border border-primary/10 bg-white/60 p-5">
                      {product.attributes.map((attribute) => (
                        <div
                          key={attribute.label}
                          className="flex flex-col gap-0.5"
                        >
                          <dt className="text-[9px] font-medium tracking-[0.18em] text-primary-dark/70 uppercase">
                            {attribute.label}
                          </dt>
                          <dd className="text-sm font-medium text-primary">
                            {attribute.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-auto flex flex-col gap-4 pt-2">
                    <div className="flex flex-col">
                      {product.compareAtPrice && (
                        <span className="text-sm text-primary/45 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                      <span className="font-display text-4xl leading-none text-primary">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <ProductCta
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
