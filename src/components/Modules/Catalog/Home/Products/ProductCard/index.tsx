import { Images, Star } from "lucide-react";
import { useProductDetailStore } from "@/lib/stores/product-detail";
import { ProductCardShell } from "../ProductCardShell";
import { ProductCta } from "../ProductCta";
import { ProductMedia } from "../ProductMedia";
import { ProductPanel } from "../ProductPanel";
import { formatPrice, type Product } from "../product.types";
import { ProductStockTag } from "./ProductStockTag";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const {
    attributes,
    category,
    compareAtPrice,
    id,
    image,
    images,
    inStock,
    name,
    price,
    rating,
    reviewCount,
  } = product;

  const openDetail = useProductDetailStore((state) => state.open);

  return (
    <ProductCardShell>
      <button
        type="button"
        onClick={() => openDetail(product)}
        aria-label={`Ver detalhes de ${name}`}
        className="cursor-pointer text-left focus-visible:outline-none"
      >
        <ProductMedia
          src={image}
          alt={name}
          priority={priority}
          overlay={
            <>
              {images.length > 1 && (
                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary-darkest/70 px-2.5 py-1 text-[10px] font-medium text-cream backdrop-blur-md">
                  <Images className="size-3" strokeWidth={2} />
                  {images.length}
                </span>
              )}

              {attributes.length > 0 && (
                <ProductPanel>
                  <dl className="flex items-center justify-between gap-3">
                    {attributes.map((attribute) => (
                      <div
                        key={attribute.label}
                        className="flex min-w-0 flex-col gap-0.5"
                      >
                        <dt className="text-[9px] tracking-[0.18em] text-gold-light/80 uppercase">
                          {attribute.label}
                        </dt>
                        <dd className="truncate text-xs font-medium text-cream">
                          {attribute.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </ProductPanel>
              )}
            </>
          }
        />
      </button>

      {!inStock && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start p-4">
          <ProductStockTag />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          {category && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.22em] text-primary-dark uppercase">
              {category}
            </span>
          )}

          {rating !== null && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs text-primary/70">
              <Star
                className="size-3.5 fill-gold text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-semibold text-primary">
                {rating.toFixed(1)}
              </span>
              <span className="sr-only">de 5, com</span>
              <span>({reviewCount})</span>
              <span className="sr-only">avaliações</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => openDetail(product)}
          className="cursor-pointer text-left focus-visible:outline-none"
        >
          <h3 className="font-display text-xl leading-tight text-primary transition-colors duration-200 hover:text-primary-dark sm:text-2xl">
            {name}
          </h3>
        </button>

        <div className="mt-auto flex flex-col gap-6 pt-3">
          <div className="flex flex-col">
            {compareAtPrice && (
              <span className="text-xs text-primary/45 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
            <span className="font-display text-2xl leading-none text-primary">
              {formatPrice(price)}
            </span>
          </div>

          <ProductCta id={id} name={name} image={image} price={price} />
        </div>
      </div>
    </ProductCardShell>
  );
}
