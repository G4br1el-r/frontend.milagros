"use client";

import { LogOut } from "lucide-react";
import { motion } from "motion/react";
import { formatDocument } from "@/lib/customer/customer.format";
import type { Customer } from "@/lib/customer/customer.types";
import { popoverVariants } from "../identity.motion";

interface CustomerMenuPanelProps {
  customer: Customer;
  onSignOut: () => void;
}

export function CustomerMenuPanel({
  customer,
  onSignOut,
}: CustomerMenuPanelProps) {
  return (
    <motion.div
      variants={popoverVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex w-60 flex-col gap-3 origin-top-right"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-primary/50 uppercase">
          Conectado como
        </span>

        <span className="truncate font-display text-sm text-primary">
          {customer.nomeRazaoSocial}
        </span>

        <span className="font-mono text-xs text-primary/60">
          {formatDocument(customer.cpfCnpj)}
        </span>
      </div>

      <button
        type="button"
        onClick={onSignOut}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
      >
        <LogOut className="size-3.5" strokeWidth={2} />
        Sair
      </button>
    </motion.div>
  );
}
