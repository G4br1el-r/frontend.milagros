import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";
export default function Loading() {
  return (
    <main className="w-full flex-1">
      <div className="h-svh w-full bg-primary-dark" />
      <ProductsSectionSkeleton />
    </main>
  );
}
