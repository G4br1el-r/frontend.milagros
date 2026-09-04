"use client";

import { motion } from "motion/react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import type { ParcelaOpcaoDto } from "@/lib/checkout/checkout.types";
import { cn } from "@/lib/utils/cn";
import { springSnappy } from "../checkout.motion";

interface InstallmentOptionProps {
  option: ParcelaOpcaoDto;
  selected: boolean;
  onSelect: () => void;
}

export function InstallmentOption({
  option,
  selected,
  onSelect,
}: InstallmentOptionProps) {
  const {
    numeroParcelas,
    valorParcela,
    prazosDescricao,
    datasVencimentoSugeridas,
  } = option;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors duration-200",
        selected
          ? "border-gold bg-gold/10"
          : "border-primary/12 hover:border-primary/25 hover:bg-primary/[0.03]",
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-primary">
          {numeroParcelas === 1
            ? "À vista"
            : `${numeroParcelas}x de ${formatPrice(valorParcela)}`}
        </span>

        {prazosDescricao && (
          <span className="truncate text-[11px] text-primary/55">
            {prazosDescricao}
          </span>
        )}

        {datasVencimentoSugeridas.length > 0 && (
          <span className="truncate text-[10px] text-primary/45">
            Vencimentos: {datasVencimentoSugeridas.join(" · ")}
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
  );
}
