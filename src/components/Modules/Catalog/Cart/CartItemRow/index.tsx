"use client";

import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
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
      className="relative flex gap-3 border-b border-primary/8 px-4 py-4 last:border-b-0 sm:gap-4 sm:px-6"
    >
      <div className="relative w-24 shrink-0 self-stretch overflow-hidden rounded-md bg-primary-darkest">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pr-7">
        <h4 className="truncate font-display text-sm leading-snug text-primary">
          {item.name}
        </h4>

        <span className="text-sm font-medium text-primary/70">
          {formatPrice(item.price)}
        </span>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <QuantityStepper
            quantity={item.quantity}
            onChange={(next) => setQuantity(item.id, next)}
            onRemove={() => removeItem(item.id)}
          />

          <span className="font-display text-sm text-primary">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.id)}
        aria-label={`Remover ${item.name} do carrinho`}
        className="absolute top-4 right-4 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary/40 transition-colors duration-200 hover:bg-terracotta/10 hover:text-terracotta sm:size-7 sm:right-6"
      >
        <Trash2 className="size-3.5 sm:size-4" strokeWidth={1.75} />
      </button>
    </motion.div>
  );
}
