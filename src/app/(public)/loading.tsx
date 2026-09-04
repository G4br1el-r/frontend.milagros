import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";

export default function Loading() {
  return (
    <main className="w-full flex-1">
      {/* Altura do hero (h-svh) reservada para nao gerar CLS quando ele entra. */}
      <div className="h-svh w-full bg-primary-dark" />
      <ProductsSectionSkeleton />
    </main>
  );
}
