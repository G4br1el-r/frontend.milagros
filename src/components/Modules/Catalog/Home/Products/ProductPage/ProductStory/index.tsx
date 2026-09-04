"use client";

import { motion } from "motion/react";
import { PRODUCT_FALLBACK_DESCRIPTION } from "../../product.constants";
import {
  DETAIL_VIEWPORT,
  hairline,
  riseSoft,
  specStage,
} from "../product-page.motion";

interface ProductStoryProps {
  description: string | null;
  name: string;
}

/**
 * Descrição do fornecedor. Quando ela não existe (o mapper devolve
 * PRODUCT_FALLBACK_DESCRIPTION), a seção inteira sai do ar em vez de
 * mostrar "Descrição não informada" — texto de erro não vende.
 */
export function ProductStory({ description, name }: ProductStoryProps) {
  const hasDescription =
    description && description !== PRODUCT_FALLBACK_DESCRIPTION;

  if (!hasDescription) return null;

  // A descricao vem como texto corrido com quebras de linha; virar <p> de
  // verdade e o que permite as colunas quebrarem entre paragrafos.
  const paragraphs = description
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <motion.section
      aria-labelledby="sobre-produto-heading"
      variants={specStage}
      initial="hidden"
      whileInView="show"
      viewport={DETAIL_VIEWPORT}
      className="flex flex-col gap-6"
    >
      <motion.h2
        variants={riseSoft}
        id="sobre-produto-heading"
        className="font-display text-2xl text-primary sm:text-3xl"
      >
        Sobre {name}
      </motion.h2>

      <motion.span
        variants={hairline}
        className="h-px w-24 origin-left bg-linear-to-r from-gold to-transparent"
      />

      {/* Largura inteira, sem `columns`: com descricao curta o texto cabia
          todo na primeira coluna e a segunda ficava vazia — parecia uma
          tira solta no meio da pagina. Aqui cada paragrafo usa a largura
          disponivel do container. */}
      <motion.div
        variants={riseSoft}
        className="flex w-full flex-col gap-5 text-base leading-[1.75] text-primary/75"
      >
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-justify [hyphens:auto] [text-wrap:pretty]"
            lang="pt-BR"
          >
            {paragraph}
          </p>
        ))}
      </motion.div>
    </motion.section>
  );
}
