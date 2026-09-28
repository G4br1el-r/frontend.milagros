import { MAIN_CONTENT_ID } from "@/components/Layout/skip-link.constants";
import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";
export default function Loading() {
  return (
    <main id={MAIN_CONTENT_ID} className="w-full flex-1">
      <div className="h-svh w-full bg-primary-dark" />
      <ProductsSectionSkeleton />
    </main>
  );
}
