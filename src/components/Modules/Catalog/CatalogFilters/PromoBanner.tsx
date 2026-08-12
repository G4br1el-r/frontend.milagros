import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import type { CatalogPromoBanner } from "@/lib/utils/constants";
import { iconMap } from "@/lib/utils/iconsMap";

interface PromoBannerProps {
  promo: CatalogPromoBanner;
}

export function PromoBanner({ promo }: PromoBannerProps) {
  const Icon = iconMap[promo.icon];

  return (
    <FadeIn
      distance={16}
      className="relative overflow-hidden rounded-2xl bg-primary-dark p-5"
    >
      <div className="flex items-center gap-2 text-gold-light">
        <Icon className="size-4" strokeWidth={1.75} />
        <span className="text-sm font-semibold tracking-wide uppercase">
          {promo.title}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/60">{promo.subtitle}</p>

      <div className="relative mt-4 h-49 w-full overflow-hidden rounded-xl">
        <Image
          src={promo.image}
          alt=""
          fill
          className="object-cover object-top opacity-90"
        />
      </div>
    </FadeIn>
  );
}
