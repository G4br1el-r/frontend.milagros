"use client";

import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useCheckout } from "@/lib/hooks/use-checkout";
import { useCartStore, useCartTotal } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { useCustomerStore } from "@/lib/stores/customer";
import { listItemVariants, stepVariants } from "../checkout.motion";
import { OrderSummary } from "../OrderSummary";
import { ReviewItem } from "./ReviewItem";

export function CheckoutReview() {
  const items = useCartStore((state) => state.items);
  const total = useCartTotal();
  const customer = useCustomerStore((state) => state.customer);

  const closeCheckout = useCheckoutStore((state) => state.close);
  const resetCheckout = useCheckoutStore((state) => state.reset);
  const openCart = useCartStore((state) => state.open);
  const goToStep = useCheckoutStore((state) => state.goToStep);

  const isValidating = useCheckoutStore((state) => state.isValidating);
  const validation = useCheckoutStore((state) => state.validation);
  const validationError = useCheckoutStore((state) => state.validationError);

  const { validate } = useCheckout();

  const handleBackToCart = () => {
    closeCheckout();
    resetCheckout();
    openCart();
  };

  const isApproved = Boolean(validation?.valido);

  const handlePrimaryAction = () => {
    if (isApproved) {
      goToStep("pagamento");
      return;
    }

    void validate();
  };

  // Valida uma vez ao abrir; o usuario so revalida se voltar e tentar de novo.
  const hasAutoValidated = useRef(false);

  useEffect(() => {
    if (hasAutoValidated.current || validation || isValidating) return;
    if (!customer || items.length === 0) return;

    hasAutoValidated.current = true;
    void validate();
  }, [customer, items.length, validation, isValidating, validate]);

  // Recusa da API (pedido minimo, por exemplo) chega como valido=false.
  const rejection = validation && !validation.valido ? validation : null;

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <div className="flex flex-col gap-5">
          <button
            type="button"
            onClick={handleBackToCart}
            className="inline-flex w-fit cursor-pointer items-center gap-1.5 pt-4 text-[11px] font-bold tracking-[0.12em] text-primary/70 uppercase transition-opacity duration-200 hover:opacity-70 sm:pt-6"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.5} />
            Voltar ao carrinho
          </button>

          <motion.ul variants={listItemVariants} className="flex flex-col">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <ReviewItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.ul>

          <motion.div variants={listItemVariants}>
            <OrderSummary subtotal={total} total={total} />
          </motion.div>

          <AnimatePresence mode="wait">
            {(rejection || validationError) && (
              <motion.div
                key={rejection?.mensagem ?? validationError}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3"
              >
                <AlertCircle
                  className="mt-0.5 size-4 shrink-0 text-amber-700"
                  strokeWidth={2}
                />
                <p className="text-xs leading-relaxed text-amber-900">
                  {rejection?.mensagem ?? validationError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-primary/10 bg-cream p-4 sm:p-6">
        <motion.button
          type="button"
          onClick={handlePrimaryAction}
          disabled={isValidating || items.length === 0 || Boolean(rejection)}
          whileTap={{ scale: 0.985 }}
          className="relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isValidating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Validando
            </>
          ) : isApproved ? (
            "Confirmar e ir para pagamento"
          ) : (
            "Validar pedido"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
