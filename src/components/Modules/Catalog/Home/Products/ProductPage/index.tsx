"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { ProductRelated } from "../ProductRelated";
import type { Product } from "../product.types";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductBuyPanel } from "./ProductBuyPanel";
import { ProductPageGallery } from "./ProductPageGallery";
import { ProductSpecs } from "./ProductSpecs";
import { ProductStickyBar } from "./ProductStickyBar";
import { ProductStory } from "./ProductStory";
import { ProductTrustRow } from "./ProductTrustRow";
import { revealMedia } from "./product-page.motion";

interface ProductPageProps {
  product: Product;
}

/**
 * Página de produto — substitui o modal do catálogo (o card agora navega
 * para cá). Mesma ordem de leitura do modal antigo (imagem → identidade →
 * preço → CTA → ficha → descrição → relacionados), com o espaço que o
 * modal não tinha: galeria com zoom, ficha técnica completa, faixa de
 * garantias e barra de compra fixa no mobile.
 */
export function ProductPage({ product }: ProductPageProps) {
  const ctaAnchorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax discreto: a coluna da galeria sobe um pouco mais devagar que a
  // página. Só no desktop (a coluna é sticky lá) e nunca com reduced motion.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="relative w-full bg-cream">
      {/* Brilho de topo: a página não começa num corte seco de cor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-linear-to-b from-gold/12 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8 sm:pt-32 lg:px-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <ProductBreadcrumb category={product.category} name={product.name} />
        </motion.div>

        <div
          ref={heroRef}
          className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-start lg:gap-14"
        >
          <motion.div
            variants={revealMedia}
            initial="hidden"
            animate="show"
            style={reduceMotion ? undefined : { y: mediaY }}
            className="lg:sticky lg:top-28"
          >
            <ProductPageGallery images={product.images} alt={product.name} />
          </motion.div>

          <div className="flex flex-col gap-14">
            <div ref={ctaAnchorRef}>
              <ProductBuyPanel product={product} />
            </div>

            <ProductSpecs product={product} />
          </div>
        </div>

        {/* Fora da grade de duas colunas: a descricao do fornecedor costuma
            ser longa e ficava espremida na coluna da direita, com a metade
            esquerda vazia. Aqui ela usa a largura toda da pagina. */}
        <div className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-24">
          <ProductStory description={product.description} name={product.name} />

          <ProductTrustRow />

          {product.category && (
            <ProductRelated
              category={product.category}
              excludeId={product.id}
            />
          )}
        </div>
      </div>

      <ProductStickyBar product={product} anchorRef={ctaAnchorRef} />
    </div>
  );
}
