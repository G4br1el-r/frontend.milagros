import { Flame, Heart, Star } from "lucide-react";
import type { CatalogProduct } from "@/lib/utils/constants";

const CTA_LABEL: Record<CatalogProduct["ctaVariant"], string> = {
  add: "Adicionar ao Carrinho",
  options: "Ver Opções",
};

interface ProductCardProps {
  product: CatalogProduct;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static 5-star scale, index is a stable position
          <span key={index} className="relative inline-block size-3.5 shrink-0">
            <Star
              className="absolute inset-0 size-3.5 text-gold/30"
              strokeWidth={1.5}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star
                className="size-3.5 fill-gold text-gold"
                strokeWidth={1.5}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br from-primary/8 to-terracotta/10">
        <Flame
          className="size-10 text-primary/20 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1}
        />

        <button
          type="button"
          aria-label="Favoritar"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-surface/90 text-text-muted transition-colors hover:text-terracotta"
        >
          <Heart className="size-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-wide text-text uppercase">
            {product.name}
          </span>
          <span className="text-xs text-text-muted">{product.subtitle}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-text-muted">
            ({product.reviewCount})
          </span>
        </div>

        <div className="text-sm text-text">
          {product.priceFrom && (
            <span className="text-text-muted">A partir de </span>
          )}
          <span className="font-semibold">R$ {formattedPrice}</span>
        </div>

        <button
          type="button"
          className="mt-auto w-full rounded-lg bg-primary py-2.5 text-xs font-semibold tracking-wide text-background uppercase transition-colors hover:bg-primary-light"
        >
          {CTA_LABEL[product.ctaVariant]}
        </button>
      </div>
    </div>
  );
}
