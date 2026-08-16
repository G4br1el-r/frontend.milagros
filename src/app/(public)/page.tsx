import { Hero } from "@/components/Modules/Catalog/Home/Hero";

export default function Home() {
  return (
    <main className="w-full flex-1">
      <Hero />
      <div className="relative z-10 w-full bg-cream">
        <div className="h-dvh w-full" />
      </div>
    </main>
  );
}
