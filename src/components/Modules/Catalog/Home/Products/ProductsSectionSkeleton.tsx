import { ProductCardSkeleton } from "./ProductCard/ProductCardSkeleton";
import { PRODUCT_SKELETON_FALLBACK_COUNT } from "./product.constants";
export function ProductsSectionSkeleton() {
  return (
    <section className="relative z-10 w-full scroll-mt-24 bg-cream">
      <div className="mx-auto w-full max-w-[1920px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto mb-12 h-32 w-full max-w-2xl animate-pulse rounded-2xl bg-primary/5 sm:mb-16" />
        <div className="flex items-start gap-4 px-3 sm:px-4 xl:gap-5">
          <div className="hidden w-80 shrink-0 animate-pulse rounded-xl bg-primary/5 lg:block lg:h-[600px]" />
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5">
            {Array.from(
              { length: PRODUCT_SKELETON_FALLBACK_COUNT },
              (_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de placeholders sem identidade própria
                <ProductCardSkeleton key={index} />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
