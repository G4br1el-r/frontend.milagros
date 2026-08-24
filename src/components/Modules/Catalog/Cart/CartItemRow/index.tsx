"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/Modules/Catalog/Home/Products/ProductMedia/ImagePlaceholder";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { type CartItem, useCartStore } from "@/lib/stores/cart";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 border-b border-primary/8 px-4 py-4 last:border-b-0 sm:gap-4 sm:px-6"
    >
      <div className="relative w-24 shrink-0 self-stretch overflow-hidden rounded-md bg-primary-darkest">
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
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h4 className="truncate font-display text-sm leading-snug text-primary">
          {item.name}
        </h4>

        <span className="text-sm font-medium text-primary/70">
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

          <span className="font-display text-sm text-primary">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
