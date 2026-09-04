"use client";
import { AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { CheckoutPayment } from "../CheckoutPayment";
import { CheckoutReview } from "../CheckoutReview";
import { CheckoutSteps } from "../CheckoutSteps";
import { CheckoutSuccess } from "../CheckoutSuccess";
export function CheckoutSheet() {
  const isOpen = useCheckoutStore((state) => state.isOpen);
  const close = useCheckoutStore((state) => state.close);
  const step = useCheckoutStore((state) => state.step);
  return (
    <Sheet open={isOpen} onOpenChange={(next) => !next && close()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-primary/10 bg-cream p-0 sm:max-w-lg"
      >
        <SheetHeader className="flex flex-col gap-4 border-b border-primary/10 p-4 sm:p-6">
          <SheetTitle className="font-display text-xl text-primary">
            Finalizar pedido
          </SheetTitle>
          <CheckoutSteps current={step} />
        </SheetHeader>
        <AnimatePresence mode="wait" initial={false}>
          {step === "revisao" && <CheckoutReview key="revisao" />}
          {step === "pagamento" && <CheckoutPayment key="pagamento" />}
          {step === "sucesso" && <CheckoutSuccess key="sucesso" />}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
