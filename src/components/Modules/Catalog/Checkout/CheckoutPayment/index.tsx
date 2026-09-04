"use client";

import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { sortPaymentMethods } from "@/lib/checkout/checkout.format";
import { useCheckout } from "@/lib/hooks/use-checkout";
import {
  useCheckoutStore,
  useSelectedForma,
  useSelectedParcela,
} from "@/lib/stores/checkout";
import { listItemVariants, stepVariants } from "../checkout.motion";
import { OrderSummary } from "../OrderSummary";
import { PaymentMethodCard } from "../PaymentMethodCard";

export function CheckoutPayment() {
  const validation = useCheckoutStore((state) => state.validation);
  const selectedFormaId = useCheckoutStore((state) => state.selectedFormaId);
  const selectedParcelas = useCheckoutStore((state) => state.selectedParcelas);
  const selectForma = useCheckoutStore((state) => state.selectForma);
  const selectParcelas = useCheckoutStore((state) => state.selectParcelas);
  const observacoes = useCheckoutStore((state) => state.observacoes);
  const setObservacoes = useCheckoutStore((state) => state.setObservacoes);
  const isFinalizing = useCheckoutStore((state) => state.isFinalizing);
  const finalizeError = useCheckoutStore((state) => state.finalizeError);

  const forma = useSelectedForma();
  const parcela = useSelectedParcela();
  const { finalize, canFinalize } = useCheckout();

  if (!validation) return null;

  const formas = sortPaymentMethods(validation.formasPagamento);

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
          {/* Mesma posicao e estilo do "Voltar ao carrinho" do
              CheckoutReview: no topo da area rolavel, nao no rodape — o
              rodape e so da acao primaria. O pt-4/sm:pt-6 daqui e o respiro
              de topo do passo. */}
          <BackToReviewButton disabled={isFinalizing} />

          <motion.div
            variants={listItemVariants}
            className="flex flex-col gap-2.5"
          >
            {formas.map((item) => (
              <PaymentMethodCard
                key={item.id}
                forma={item}
                selected={selectedFormaId === item.id}
                selectedParcelas={selectedParcelas}
                onSelect={() => selectForma(item)}
                onSelectParcelas={selectParcelas}
              />
            ))}
          </motion.div>

          <motion.div
            variants={listItemVariants}
            className="flex flex-col gap-1.5"
          >
            <label
              htmlFor="observacoes"
              className="text-[11px] font-semibold tracking-[0.08em] text-primary/70 uppercase"
            >
              Observações
            </label>

            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(event) => setObservacoes(event.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Alguma instrução para o pedido? (opcional)"
              className="w-full resize-none rounded-lg border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none transition-colors duration-200 placeholder:text-primary/35 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25"
            />
          </motion.div>

          <motion.div variants={listItemVariants}>
            <OrderSummary
              subtotal={validation.totalPedido}
              total={validation.totalPedido}
              parcelaLabel={
                parcela
                  ? `em ${parcela.numeroParcelas}x · ${parcela.prazosDescricao ?? ""}`
                  : null
              }
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {finalizeError && (
              <motion.div
                key={finalizeError}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-red-300 bg-red-50 p-3"
              >
                <AlertCircle
                  className="mt-0.5 size-4 shrink-0 text-red-600"
                  strokeWidth={2}
                />
                <p className="text-xs leading-relaxed text-red-800">
                  {finalizeError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-primary/10 bg-cream p-4 sm:p-6">
        <motion.button
          type="button"
          onClick={finalize}
          disabled={!canFinalize || isFinalizing}
          whileTap={{ scale: 0.985 }}
          className="relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isFinalizing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Emitindo pedido
            </>
          ) : (
            `Confirmar pedido${forma ? ` · ${forma.tipoForma}` : ""}`
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function BackToReviewButton({ disabled }: { disabled?: boolean }) {
  const goToStep = useCheckoutStore((state) => state.goToStep);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => goToStep("revisao")}
      className="inline-flex w-fit cursor-pointer items-center gap-1.5 pt-4 text-[11px] font-bold tracking-[0.12em] text-primary/70 uppercase transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed sm:pt-6"
    >
      <ArrowLeft className="size-3.5" strokeWidth={2.5} />
      Voltar à revisão
    </button>
  );
}
