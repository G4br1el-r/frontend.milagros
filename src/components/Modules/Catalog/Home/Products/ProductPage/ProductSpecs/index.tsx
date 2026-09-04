"use client";
import { motion } from "motion/react";
import { PRODUCT_FALLBACK_TEXT } from "../../product.constants";
import type { Product } from "../../product.types";
import {
  DETAIL_VIEWPORT,
  riseSoft,
  specRow,
  specStage,
} from "../product-page.motion";

interface ProductSpecsProps {
  product: Product;
}
interface SpecEntry {
  label: string;
  value: string;
}
function buildSpecs(product: Product): SpecEntry[] {
  const entries: SpecEntry[] = [];
  if (product.type) entries.push({ label: "Tipo", value: product.type });
  if (product.burnTime)
    entries.push({ label: "Tempo de queima", value: product.burnTime });
  if (product.category)
    entries.push({ label: "Categoria", value: product.category });
  if (product.unit)
    entries.push({ label: "Unidade de venda", value: product.unit });
  if (product.weightKg)
    entries.push({ label: "Peso", value: `${product.weightKg} kg` });
  const dimension = product.attributes.find(
    (attribute) => attribute.label === "Dimensões",
  );
  if (dimension) entries.push({ label: "Dimensões", value: dimension.value });
  entries.push({ label: "Código", value: product.id || PRODUCT_FALLBACK_TEXT });
  return entries;
}
export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = buildSpecs(product);
  if (specs.length === 0) return null;
  return (
    <motion.section
      aria-labelledby="ficha-tecnica-heading"
      variants={specStage}
      initial="hidden"
      whileInView="show"
      viewport={DETAIL_VIEWPORT}
      className="flex flex-col gap-6"
    >
      <motion.h2
        variants={riseSoft}
        id="ficha-tecnica-heading"
        className="font-display text-2xl text-primary sm:text-3xl"
      >
        Ficha técnica
      </motion.h2>
      <dl className="grid gap-x-10 sm:grid-cols-2">
        {specs.map((spec) => (
          <motion.div
            key={spec.label}
            variants={specRow}
            className="flex items-baseline justify-between gap-4 border-b border-primary/10 py-4"
          >
            <dt className="text-[10px] font-medium tracking-[0.2em] text-primary-dark/80 uppercase">
              {spec.label}
            </dt>
            <dd className="text-right text-sm font-medium text-primary">
              {spec.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
