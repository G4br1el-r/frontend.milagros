"use client";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/Modules/Catalog/Home/Products/ProductMedia/ImagePlaceholder";
import { buildProductSlug } from "@/components/Modules/Catalog/Home/Products/product.slug";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { type CartItem, useCartStore } from "@/lib/stores/cart";

interface CartItemRowProps {
  item: CartItem;
}
export function CartItemRow({ item }: CartItemRowProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const closeCart = useCartStore((state) => state.close);
  const productHref = `/produtos/${buildProductSlug(item.name, item.id)}`;
  return (
    <motion.div
      layout
      initial={{ gridTemplateRows: "0fr", opacity: 0 }}
      animate={{ gridTemplateRows: "1fr", opacity: 1 }}
      exit={{ gridTemplateRows: "0fr", opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="grid"
    >
      <div className="min-h-0 overflow-hidden">
        <div className="relative flex gap-3 border-b border-primary/8 px-4 py-4 last:border-b-0 sm:gap-4 sm:px-6">
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Remover item"
            className="absolute top-3 right-3 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary/40 transition-colors duration-200 hover:bg-terracotta/10 hover:text-terracotta sm:right-5"
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
          <Link
            href={productHref}
            onClick={closeCart}
            tabIndex={-1}
            aria-hidden="true"
            className="relative w-24 shrink-0 cursor-pointer self-stretch overflow-hidden rounded-md bg-primary-darkest transition-opacity duration-200 hover:opacity-85"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder />
            )}
          </Link>
          <div className="flex min-w-0 flex-1 flex-col gap-2 pr-8">
            <h4 className="truncate text-sm leading-snug">
              <Link
                href={productHref}
                onClick={closeCart}
                className="cursor-pointer font-display text-primary transition-colors duration-200 hover:text-terracotta focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                {item.name}
              </Link>
            </h4>
            <span className="font-sans text-sm font-medium tabular-nums text-primary/70">
              {formatPrice(item.price)}
            </span>
            <div className="mt-auto flex flex-col gap-2">
              <QuantityStepper
                quantity={item.quantity}
                onChange={(next) => setQuantity(item.id, next)}
                onRemove={() => removeItem(item.id)}
                showRemoveButton={false}
                className="w-full max-w-40"
              />
              <span className="font-sans text-sm font-semibold tabular-nums text-primary">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
