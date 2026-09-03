"use client";

import { MapPin, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { formatDocument } from "@/lib/customer/customer.format";
import type { Customer } from "@/lib/customer/customer.types";
import { listItemVariants } from "../checkout.motion";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <motion.div
      variants={listItemVariants}
      className="flex flex-col gap-3 rounded-xl border border-primary/12 bg-white p-3.5"
    >
      <div className="flex items-start gap-2.5">
        <UserRound
          className="mt-0.5 size-4 shrink-0 text-primary/50"
          strokeWidth={1.75}
        />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-primary">
            {customer.nomeRazaoSocial}
          </span>
          <span className="font-mono text-xs text-primary/55">
            {formatDocument(customer.cpfCnpj)}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 border-t border-primary/8 pt-3">
        <MapPin
          className="mt-0.5 size-4 shrink-0 text-primary/50"
          strokeWidth={1.75}
        />
        <address className="min-w-0 text-xs leading-relaxed text-primary/70 not-italic">
          {customer.logradouro}, {customer.numero}
          {customer.complemento && ` — ${customer.complemento}`}
          <br />
          {customer.bairro} · {customer.cidade}/{customer.uf}
          <br />
          CEP {customer.cep}
        </address>
      </div>
    </motion.div>
  );
}
