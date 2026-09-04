"use client";

import { Church, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";
import { DETAIL_VIEWPORT, specRow, specStage } from "../product-page.motion";

/**
 * Faixa de garantias do atacado — o que responde a objeção de quem está
 * decidindo. Conteúdo fixo (não vem da API): são políticas da casa, não
 * atributos do produto.
 */
const TRUST_ITEMS = [
  {
    icon: Church,
    title: "Uso litúrgico",
    body: "Produtos aprovados para celebração em paróquias e capelas.",
  },
  {
    icon: PackageCheck,
    title: "Preço de atacado",
    body: "Sua tabela de preço já aplicada, sem cálculo posterior.",
  },
  {
    icon: Truck,
    title: "Envio para todo o Brasil",
    body: "Frete e prazo confirmados na finalização do pedido.",
  },
  {
    icon: ShieldCheck,
    title: "Pedido acompanhado",
    body: "Confirmação por WhatsApp e PDF do pedido ao fechar.",
  },
] as const;

export function ProductTrustRow() {
  return (
    <motion.ul
      variants={specStage}
      initial="hidden"
      whileInView="show"
      viewport={DETAIL_VIEWPORT}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
        <motion.li
          key={title}
          variants={specRow}
          className="flex flex-col gap-2.5 rounded-2xl border border-primary/10 bg-white/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40"
        >
          <Icon
            className="size-5 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="font-display text-base text-primary">{title}</span>
          <span className="text-xs leading-relaxed text-primary/65">
            {body}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
