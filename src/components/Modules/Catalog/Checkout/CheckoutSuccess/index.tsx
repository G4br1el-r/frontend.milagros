"use client";

import { Check, FileText, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import { useCartStore } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import {
  listItemVariants,
  springSnappy,
  successVariants,
} from "../checkout.motion";

export function CheckoutSuccess() {
  const result = useCheckoutStore((state) => state.result);
  const reset = useCheckoutStore((state) => state.reset);
  const clearCart = useCartStore((state) => state.clear);

  if (!result) return null;

  return (
    <motion.div
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <div className="flex flex-col items-center gap-5 pt-4 text-center">
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springSnappy, delay: 0.05 }}
            className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
          >
            <Check className="size-8" strokeWidth={2.5} />
          </motion.span>

          <motion.div
            variants={listItemVariants}
            className="flex flex-col gap-1.5"
          >
            <h3 className="font-display text-xl text-primary">
              Pedido confirmado
            </h3>

            <p className="text-sm leading-relaxed text-primary/60">
              {result.mensagem ?? "Recebemos seu pedido com sucesso."}
            </p>
          </motion.div>

          <motion.dl
            variants={listItemVariants}
            className="flex w-full flex-col gap-2 rounded-xl border border-primary/12 bg-white p-4 text-left text-sm"
          >
            {result.numeroPedido && (
              <div className="flex items-center justify-between">
                <dt className="text-primary/60">Número do pedido</dt>
                <dd className="font-mono text-primary">
                  {result.numeroPedido}
                </dd>
              </div>
            )}

            {result.numeroPedidoOmie && (
              <div className="flex items-center justify-between">
                <dt className="text-primary/60">Pedido Omie</dt>
                <dd className="font-mono text-primary">
                  {result.numeroPedidoOmie}
                </dd>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-primary/10 pt-2">
              <dt className="font-medium text-primary">Total</dt>
              <dd className="font-display text-lg text-primary">
                {formatPrice(result.valorTotal)}
              </dd>
            </div>
          </motion.dl>

          <motion.div
            variants={listItemVariants}
            className="flex w-full flex-col gap-2.5"
          >
            {result.pdfUrl && (
              <a
                href={result.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/15 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5"
              >
                <FileText className="size-4" strokeWidth={1.75} />
                Baixar PDF do pedido
              </a>
            )}

            {result.whatsappUrl && (
              <a
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-opacity duration-200 hover:opacity-90"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} />
                Confirmar no WhatsApp
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <div className="border-t border-primary/10 bg-cream p-4 sm:p-6">
        <motion.button
          type="button"
          onClick={() => {
            clearCart();
            reset();
          }}
          whileTap={{ scale: 0.985 }}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-gold-light to-gold px-6 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90"
        >
          Continuar comprando
        </motion.button>
      </div>
    </motion.div>
  );
}
