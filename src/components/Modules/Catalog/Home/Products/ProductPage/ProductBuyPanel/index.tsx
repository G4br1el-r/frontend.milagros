"use client";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { ProductCta } from "../../ProductCta";
import { formatPrice, type Product } from "../../product.types";
import { hairline, rise, stage } from "../product-page.motion";

interface ProductBuyPanelProps {
  product: Product;
}
function discountPercent(price: number, compareAt: number) {
  return Math.round(((compareAt - price) / compareAt) * 100);
}
export function ProductBuyPanel({ product }: ProductBuyPanelProps) {
  const { category, compareAtPrice, name, price, rating, reviewCount } =
    product;
  const discount = compareAtPrice ? discountPercent(price, compareAtPrice) : 0;
  return (
    <motion.div
      variants={stage}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.div variants={rise} className="flex flex-wrap items-center gap-3">
        {category && (
          <span className="inline-flex items-center rounded-full bg-gold/15 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.22em] text-primary-dark uppercase">
            {category}
          </span>
        )}
        {discount > 0 && (
          <span className="inline-flex items-center rounded-full bg-terracotta px-3.5 py-1.5 text-[10px] font-medium tracking-[0.18em] text-cream uppercase">
            -{discount}%
          </span>
        )}
        {rating !== null && reviewCount > 0 && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-sm text-primary/70">
            <Star
              className="size-4 fill-gold text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-semibold text-primary">
              {rating.toFixed(1)}
            </span>
            <span className="sr-only">de 5, com</span>
            <span className="text-primary/55">({reviewCount})</span>
            <span className="sr-only">avaliações</span>
          </span>
        )}
      </motion.div>
      <motion.h1
        variants={rise}
        className="font-display text-3xl leading-[1.12] text-balance text-primary sm:text-4xl"
      >
        {name}
      </motion.h1>
      <motion.div variants={rise} className="flex items-center gap-4">
        <motion.span
          variants={hairline}
          className="h-px w-16 origin-left bg-linear-to-r from-primary/40 to-transparent"
        />
        <span className="font-display shrink-0 text-[10px] tracking-[0.3em] text-primary/60 italic sm:text-xs">
          ad maiorem Dei gloriam
        </span>
      </motion.div>
      <motion.div
        variants={rise}
        className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white/60 p-6 backdrop-blur-sm"
      >
        {compareAtPrice && (
          <span className="font-sans text-sm tabular-nums text-primary/45 line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-sans text-4xl leading-none font-semibold tabular-nums text-primary">
            {formatPrice(price)}
          </span>
          {product.unit && (
            <span className="text-sm text-primary/55">por {product.unit}</span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-primary/55">
          Parcelamento calculado no carrinho, conforme a forma de pagamento
          escolhida. Preço de atacado já aplicado à sua tabela.
        </p>
        <div className="mt-4">
          <ProductCta
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
