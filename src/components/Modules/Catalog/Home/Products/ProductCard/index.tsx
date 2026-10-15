"use client";
import { ArrowRight, Images, Star } from "lucide-react";
import Link from "next/link";
import { ProductCardShell } from "../ProductCardShell";
import { ProductCta } from "../ProductCta";
import { ProductMedia } from "../ProductMedia";
import { ProductPanel } from "../ProductPanel";
import { formatPrice, type Product } from "../product.types";
import {
  buildProductHref,
  hasVariants,
  toCartProduct,
} from "../product.variants";

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
    name,
    price,
    rating,
    reviewCount,
  } = product;
  const href = buildProductHref(name, id);
  const withVariants = hasVariants(product);
  return (
    <ProductCardShell>
      <Link
        href={href}
        aria-label={`Ver detalhes de ${name}`}
        className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
      />
      <div className="pointer-events-none">
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
      </div>
      <div className="pointer-events-none flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 min-w-0">
          {category && (
            <span className="truncate inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.22em] text-primary-dark uppercase">
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
        <h3 className="font-display text-xl leading-tight text-balance line-clamp-2 text-primary transition-colors duration-200 sm:text-2xl">
          {name}
        </h3>
        <div className="mt-auto flex flex-col gap-6 pt-3">
          <div className="flex flex-col">
            {withVariants && (
              <span className="text-[10px] tracking-[0.18em] text-primary/55 uppercase">
                A partir de
              </span>
            )}
            {compareAtPrice && (
              <span className="font-sans text-xs tabular-nums text-primary/45 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
            <span className="font-sans text-2xl leading-none font-semibold tabular-nums text-primary">
              {formatPrice(price)}
            </span>
          </div>
          <div className="pointer-events-auto relative z-10">
            {withVariants ? (
              <Link
                href={href}
                aria-label={`Ver opções de ${name}`}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/20 text-sm font-medium text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-cream focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
              >
                Ver opções
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            ) : (
              <ProductCta item={toCartProduct(product, null)} />
            )}
          </div>
        </div>
      </div>
    </ProductCardShell>
  );
}
