import { Sparkle } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/Layout/Container";
import { StaggerReveal, StaggerItem } from "@/components/motion/ScrollReveal";
import { ProductsResults } from "./ProductsResults";
export function Products() {
  return (
    <section
      id="catalog"
      className="relative z-10 w-full scroll-mt-24 bg-cream"
    >
      <div className="relative flex h-[350px] sm:h-[450px] lg:h-[500px] items-center justify-center overflow-hidden border-y-2 border-gold">
        <Image
          src="/images/search/background-search.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-cream/80 via-cream/40 to-transparent" />
        <Container className="relative w-full">
          <StaggerReveal
            className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center gap-5 sm:gap-8"
            staggerChildren={0.15}
          >
            <StaggerItem distance={20} direction="down">
              <span className="flex items-center justify-center gap-2 text-[10px] font-medium tracking-[0.2em] text-primary-dark uppercase sm:text-sm sm:tracking-[0.38em]">
                <Sparkle className="size-3 sm:size-4 text-gold" strokeWidth={2} />
                Catálogo
              </span>
            </StaggerItem>
            
            <StaggerItem distance={20}>
              <h2 className="font-display text-3xl leading-tight text-balance text-primary sm:text-5xl lg:text-6xl">
                A maior variedade de incensos litúrgicos
              </h2>
            </StaggerItem>
            
            <StaggerItem distance={20}>
              <div className="flex items-center justify-center gap-2 sm:gap-5">
                <span className="h-px w-8 bg-linear-to-r from-transparent to-primary/40 sm:w-24" />
                <span className="font-display shrink-0 text-[10px] tracking-[0.2em] text-primary/70 italic sm:text-sm sm:tracking-[0.3em]">
                  ad maiorem Dei gloriam
                </span>
                <span className="h-px w-8 bg-linear-to-l from-transparent to-primary/40 sm:w-24" />
              </div>
            </StaggerItem>
            
            <StaggerItem distance={20} direction="up">
              <p className="max-w-xl text-balance text-base leading-relaxed text-primary/80 sm:text-lg">
                Incensos de resina, carvões e acessórios religiosos, para toda
                paróquia, capela e devoto.
              </p>
            </StaggerItem>
          </StaggerReveal>
        </Container>
      </div>
      <div className="mx-auto w-full max-w-[1920px] pb-24 sm:pb-28 lg:pb-32">
        <ProductsResults />
      </div>
    </section>
  );
}
