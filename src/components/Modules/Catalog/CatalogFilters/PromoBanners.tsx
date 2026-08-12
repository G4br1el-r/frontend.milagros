import { CATALOG_PROMO_BANNERS } from "@/lib/utils/constants";
import { PromoBanner } from "./PromoBanner";

export function PromoBanners() {
  return (
    <>
      {CATALOG_PROMO_BANNERS.map((promo) => (
        <PromoBanner key={promo.id} promo={promo} />
      ))}
    </>
  );
}
