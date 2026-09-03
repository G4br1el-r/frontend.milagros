"use client";

import { AnimatePresence, motion } from "motion/react";
import type { FormaPagamentoDto } from "@/lib/checkout/checkout.types";
import { cn } from "@/lib/utils/cn";
import {
  collapseVariants,
  listItemVariants,
  springSnappy,
} from "../checkout.motion";
import { InstallmentOption } from "../InstallmentOption";
import { PaymentMethodIcon } from "./PaymentMethodIcon";

interface PaymentMethodCardProps {
  forma: FormaPagamentoDto;
  selected: boolean;
  selectedParcelas: number | null;
  onSelect: () => void;
  onSelectParcelas: (numeroParcelas: number) => void;
}

export function PaymentMethodCard({
  forma,
  selected,
  selectedParcelas,
  onSelect,
  onSelectParcelas,
}: PaymentMethodCardProps) {
  return (
    <motion.div
      variants={listItemVariants}
      className={cn(
        "overflow-hidden rounded-xl border transition-colors duration-200",
        selected ? "border-gold bg-gold/[0.06]" : "border-primary/12 bg-white",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="flex w-full cursor-pointer items-center gap-3 p-3.5 text-left"
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
            selected ? "bg-gold/20 text-gold" : "bg-primary/6 text-primary/70",
          )}
        >
          <PaymentMethodIcon tipoForma={forma.tipoForma} />
        </span>

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium text-primary">
            {forma.nome}
          </span>

          {forma.prazosDescricao && (
            <span className="truncate text-[11px] text-primary/55">
              {forma.prazosDescricao}
            </span>
          )}
        </span>

        <motion.span
          animate={{
            borderColor: selected
              ? "var(--color-gold)"
              : "color-mix(in oklab, var(--color-primary) 25%, transparent)",
          }}
          transition={springSnappy}
          className="flex size-4 shrink-0 items-center justify-center rounded-full border"
        >
          <motion.span
            animate={{ scale: selected ? 1 : 0 }}
            transition={springSnappy}
            className="size-2 rounded-full bg-gold"
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {selected && forma.opcoesParcelamento.length > 0 && (
          <motion.div
            variants={collapseVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 border-t border-primary/10 p-3.5">
              {forma.opcoesParcelamento.map((option) => (
                <InstallmentOption
                  key={option.numeroParcelas}
                  option={option}
                  selected={selectedParcelas === option.numeroParcelas}
                  onSelect={() => onSelectParcelas(option.numeroParcelas)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
