"use client";
import { ChevronDown, FileText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";
import type { PedidoDetalhesDto } from "@/lib/checkout/checkout.types";
import { cn } from "@/lib/utils/cn";
import { presentOrderStatus } from "./order-status";

interface AccountOrderRowProps {
  order: PedidoDetalhesDto;
}
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
export function AccountOrderRow({ order }: AccountOrderRowProps) {
  const [open, setOpen] = useState(false);
  const status = presentOrderStatus(order.status);
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-5 p-5 text-left sm:p-6"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display text-lg text-primary">
              Pedido {order.numeroPedidoOmie ?? order.id.slice(0, 8)}
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase",
                status.tone,
              )}
            >
              {status.label}
            </span>
          </div>
          <span className="text-sm text-primary/55">
            {formatDate(order.dataPedido)} · {order.itens.length}{" "}
            {order.itens.length === 1 ? "item" : "itens"}
          </span>
        </div>
        <span className="font-sans text-xl font-semibold tabular-nums text-primary">
          {formatPrice(order.valorTotal)}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-primary/50 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ gridTemplateRows: "0fr" }}
            animate={{ gridTemplateRows: "1fr" }}
            exit={{ gridTemplateRows: "0fr" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid"
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col gap-6 border-t border-primary/10 p-5 sm:p-6">
                <ul className="flex flex-col gap-3">
                  {order.itens.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-primary">
                          {item.descricao ?? "Item sem descrição"}
                        </span>
                        <span className="font-sans text-xs tabular-nums text-primary/55">
                          {item.quantidade} × {formatPrice(item.valorUnitario)}
                        </span>
                      </div>
                      <span className="shrink-0 font-sans text-sm font-medium tabular-nums text-primary">
                        {formatPrice(item.valorTotal)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-1.5 border-t border-primary/10 pt-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-primary/60">Subtotal</span>
                    <span className="font-sans tabular-nums text-primary">
                      {formatPrice(order.valorSubtotal)}
                    </span>
                  </div>
                  {order.valorDesconto > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-primary/60">Desconto</span>
                      <span className="font-sans tabular-nums text-emerald-700">
                        − {formatPrice(order.valorDesconto)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">Total</span>
                    <span className="font-sans text-base font-semibold tabular-nums text-primary">
                      {formatPrice(order.valorTotal)}
                    </span>
                  </div>
                </div>
                {order.parcelas.length > 0 && (
                  <div className="flex flex-col gap-2 border-t border-primary/10 pt-3">
                    <span className="text-[11px] font-semibold tracking-[0.08em] text-primary/60 uppercase">
                      Parcelas
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {order.parcelas
                        .slice()
                        .sort((a, b) => a.numeroParcela - b.numeroParcela)
                        .map((parcela) => (
                          <li
                            key={parcela.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-primary/60">
                              {parcela.numeroParcela}/{order.parcelas.length} ·{" "}
                              {formatDate(parcela.dataVencimento)}
                            </span>
                            <span className="font-sans tabular-nums text-primary">
                              {formatPrice(parcela.valor)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                <a
                  href={`/api/pedidos/${order.id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Baixar PDF do pedido ${order.numeroPedidoOmie ?? order.id}`}
                  className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-primary/15 px-4 py-2 text-[10px] font-semibold tracking-[0.08em] text-primary uppercase transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5"
                >
                  <FileText className="size-3.5" strokeWidth={1.75} />
                  Baixar PDF
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
