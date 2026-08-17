import Image from "next/image";
import { ProductCta } from "../../Products/ProductCta";
import { formatPrice } from "../../Products/product.types";
import type { BestSeller } from "../bestSellers.data";

interface BestSellerCardProps {
  product: BestSeller;
}

const SIZES = "(min-width: 1280px) 300px, (min-width: 768px) 33vw, 75vw";

export function BestSellerCard({ product }: BestSellerCardProps) {
  const { compareAtPrice, devotion, id, image, name, price } = product;

  return (
    <div className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-cream/12 bg-white/4 transition-colors duration-500 hover:border-gold/45 focus-within:border-gold">
      <a href={`/produtos/${id}`} className="focus-visible:outline-none">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-primary-darkest">
          <Image
            src={image}
            alt={name}
            fill
            sizes={SIZES}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-108"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-darkest/70 via-transparent to-transparent" />
          <div className="hero-grain absolute inset-0" />
        </div>
      </a>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[9px] font-medium tracking-[0.22em] text-gold-light/80 uppercase">
          {devotion}
        </span>

        <a href={`/produtos/${id}`} className="focus-visible:outline-none">
          <h3 className="font-display text-base leading-snug text-cream transition-colors duration-300 group-hover/card:text-gold-light">
            {name}
          </h3>
        </a>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg leading-none text-cream">
            {formatPrice(price)}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-cream/40 line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <ProductCta id={id} name={name} image={image} price={price} />
        </div>
      </div>
    </div>
  );
}
