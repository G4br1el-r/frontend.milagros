"use client";
import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { formatDocument } from "@/lib/customer/customer.format";
import type { Customer } from "@/lib/customer/customer.types";

interface CustomerMenuPanelProps {
  customer: Customer;
  onSignOut: () => void;
  onNavigate: () => void;
}
export function CustomerMenuPanel({
  customer,
  onSignOut,
  onNavigate,
}: CustomerMenuPanelProps) {
  return (
    <div className="flex w-60 flex-col gap-3">
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
      <div className="flex flex-col gap-2">
        <Link
          href="/conta"
          onClick={onNavigate}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition-colors duration-200 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        >
          <UserRound className="size-3.5" strokeWidth={2} />
          Minha conta
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        >
          <LogOut className="size-3.5" strokeWidth={2} />
          Sair
        </button>
      </div>
    </div>
  );
}
