import { Catalog } from "@/components/Modules/Catalog/Catalog";
import { Hero } from "@/components/Modules/Catalog/Home/Hero";
import { TrustBar } from "@/components/Modules/Catalog/TrustBar";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <TrustBar />
      <Catalog />
    </main>
  );
}
