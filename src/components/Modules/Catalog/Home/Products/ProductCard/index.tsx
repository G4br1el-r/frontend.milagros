import { Flame } from "lucide-react";
import { ProductCardShell } from "../ProductCardShell";
import { ProductCta } from "../ProductCta";
import { ProductMedia } from "../ProductMedia";
import { ProductPanel } from "../ProductPanel";
import { formatPrice, type Product } from "../product.types";
import { ProductBadgeTag } from "./ProductBadgeTag";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const {
    attributes,
    badge,
    compareAtPrice,
    devotion,
    id,
    image,
    name,
    price,
  } = product;

  return (
    <ProductCardShell>
      <ProductMedia
        src={image}
        alt={name}
        priority={priority}
        overlay={
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
        }
      />

      {badge && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start p-4">
          <ProductBadgeTag badge={badge} />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.22em] text-primary-dark uppercase">
          <Flame className="size-3 shrink-0 text-terracotta" strokeWidth={2} />
          {devotion}
        </span>

        <h3 className="font-display text-xl leading-tight text-primary sm:text-2xl">
          {name}
        </h3>

        <div className="mt-auto flex flex-col gap-4 pt-3">
          <div className="flex items-end justify-between gap-3">
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

            <span className="pb-0.5 text-right text-[10px] leading-tight tracking-[0.1em] text-primary/50 uppercase">
              até 3x
              <br />
              sem juros
            </span>
          </div>

          <ProductCta href={`/produtos/${id}`} productName={name} />
        </div>
      </div>
    </ProductCardShell>
  );
}
