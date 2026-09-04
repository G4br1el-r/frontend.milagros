"use client";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { useIdentityGuard } from "@/lib/hooks/use-identity-guard";
import { useCartStore } from "@/lib/stores/cart";
import { cardCta } from "../product.motion";

interface ProductCtaProps {
  id: string;
  name: string;
  image: string | null;
  price: number;
}
const CTA_CLASS =
  "absolute inset-0 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none";
export function ProductCta({ id, name, image, price }: ProductCtaProps) {
  const quantity = useCartStore(
    (state) => state.items.find((item) => item.id === id)?.quantity ?? 0,
  );
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const { addToCart } = useIdentityGuard();
  return (
    <div className="relative h-12 w-full">
      <AnimatePresence initial={false} mode="popLayout">
        {quantity > 0 ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <QuantityStepper
              quantity={quantity}
              onChange={(next) => setQuantity(id, next)}
              onRemove={() => removeItem(id)}
              className="h-12 w-full justify-between"
            />
          </motion.div>
        ) : (
          <motion.button
            key="add"
            type="button"
            onClick={() => addToCart({ id, name, image, price })}
            variants={cardCta}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            whileTap="tap"
            className={`${CTA_CLASS} bg-primary text-cream hover:bg-primary-darkest focus-visible:ring-primary`}
          >
            <ShoppingBag className="size-4" strokeWidth={2} />
            Adicionar ao carrinho
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
