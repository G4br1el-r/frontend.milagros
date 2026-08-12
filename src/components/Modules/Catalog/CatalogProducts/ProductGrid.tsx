import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CATALOG_PRODUCTS } from "@/lib/utils/constants";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <Stagger
      staggerDelay={0.08}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {CATALOG_PRODUCTS.map((product) => (
        <StaggerItem key={product.id} distance={20}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
