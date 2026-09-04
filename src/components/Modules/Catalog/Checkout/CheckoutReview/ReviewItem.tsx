"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import type { CartItem } from "@/lib/stores/cart";
import { listItemVariants } from "../checkout.motion";

interface ReviewItemProps {
  item: CartItem;
}
export function ReviewItem({ item }: ReviewItemProps) {
  return (
    <motion.li
      variants={listItemVariants}
      className="flex items-center gap-3 border-b border-primary/8 py-3 last:border-b-0"
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-primary/5">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm text-primary">{item.name}</span>
        <span className="text-xs text-primary/55">
          {item.quantity} × {formatPrice(item.price)}
        </span>
      </div>
      <span className="shrink-0 text-sm font-medium text-primary">
        {formatPrice(item.price * item.quantity)}
      </span>
    </motion.li>
  );
}
