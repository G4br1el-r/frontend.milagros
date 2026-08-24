import { Suspense } from "react";
import { BestSellers } from "@/components/Modules/Catalog/Home/BestSellers";
import { Hero } from "@/components/Modules/Catalog/Home/Hero";
import { Products } from "@/components/Modules/Catalog/Home/Products";
import { ProductsSectionSkeleton } from "@/components/Modules/Catalog/Home/Products/ProductsSectionSkeleton";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Hero />
      <BestSellers />
      <Suspense fallback={<ProductsSectionSkeleton />}>
        <Products />
      </Suspense>
    </main>
  );
}
