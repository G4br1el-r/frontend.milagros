import { FadeIn } from "@/components/motion/fade-in";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { PRODUCTS } from "./products.data";

const PRIORITY_COUNT = 3;

export function Products() {
  return (
    <section
      id="catalog"
      className="relative z-10 w-full scroll-mt-24 bg-cream"
    >
      <div className="w-full py-20 sm:py-24 lg:py-28">
        <FadeIn
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-5 px-5 text-center sm:mb-16 sm:px-8"
          distance={20}
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-primary-dark uppercase sm:text-[11px] sm:tracking-[0.38em]">
            Catálogo
          </span>

          <h2 className="font-display text-3xl leading-tight text-balance text-primary sm:text-4xl lg:text-5xl">
            A maior variedade de incensos litúrgicos
          </h2>

          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <span className="h-px w-14 bg-linear-to-r from-transparent to-primary/40 sm:w-24" />
            <span className="font-display shrink-0 text-[10px] tracking-[0.3em] text-primary/70 italic sm:text-xs">
              ad maiorem Dei gloriam
            </span>
            <span className="h-px w-14 bg-linear-to-l from-transparent to-primary/40 sm:w-24" />
          </div>

          <p className="max-w-xl text-balance text-sm leading-relaxed text-primary/70 sm:text-base">
            Incensos de resina, carvões e acessórios religiosos, para toda
            paróquia, capela e devoto.
          </p>
        </FadeIn>

        <div className="mb-4 flex items-center justify-between gap-4 px-3 sm:px-4">
          <span className="text-sm text-primary/55">
            Exibindo {PRODUCTS.length} de {PRODUCTS.length} produtos
          </span>
          <div className="lg:hidden">
            <ProductFilters mobileOnly />
          </div>
        </div>

        <div className="flex items-start gap-4 px-3 sm:px-4 xl:gap-5">
          <ProductFilters desktopOnly />

          <div className="min-w-0 flex-1">
            <ProductGrid>
              {PRODUCTS.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < PRIORITY_COUNT}
                />
              ))}
            </ProductGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
