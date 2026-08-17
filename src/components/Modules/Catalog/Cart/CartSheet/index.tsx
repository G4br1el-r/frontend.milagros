"use client";

import { AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore, useCartTotal } from "@/lib/stores/cart";
import { CartEmpty } from "../CartEmpty";
import { CartFooter } from "../CartFooter";
import { CartItemRow } from "../CartItemRow";

export function CartSheet() {
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const open = useCartStore((state) => state.open);
  const items = useCartStore((state) => state.items);
  const total = useCartTotal();

  return (
    <Sheet open={isOpen} onOpenChange={(next) => (next ? open() : close())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-primary/10 bg-cream sm:max-w-md"
      >
        <SheetHeader className="border-b border-primary/10 p-4 sm:p-6">
          <SheetTitle className="font-display text-xl text-primary">
            Seu carrinho
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {items.length > 0 && <CartFooter total={total} />}
      </SheetContent>
    </Sheet>
  );
}
