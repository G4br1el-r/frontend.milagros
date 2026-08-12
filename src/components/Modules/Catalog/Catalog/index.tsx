import { CatalogFilters } from "@/components/Modules/Catalog/CatalogFilters";
import { FilterModal } from "@/components/Modules/Catalog/CatalogFilters/FilterModal";
import { PromoBanners } from "@/components/Modules/Catalog/CatalogFilters/PromoBanners";
import { CatalogHeader } from "@/components/Modules/Catalog/CatalogHeader";
import { CatalogProducts } from "@/components/Modules/Catalog/CatalogProducts";
import { Pagination } from "@/components/Modules/Catalog/CatalogProducts/Pagination";
import { ProductsToolbar } from "@/components/Modules/Catalog/CatalogProducts/ProductsToolbar";
import { FadeIn } from "@/components/motion/fade-in";

export function Catalog() {
  return (
    <section id="catalogo" className="min-h-screen w-full bg-background">
      <FadeIn direction="up" distance={24} duration={0.7}>
        <CatalogHeader />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:px-8 lg:py-12">
          <ProductsToolbar />

          <div className="flex flex-col gap-6 lg:hidden">
            <FilterModal />
            <PromoBanners />
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[288px_1fr]">
            <CatalogFilters />
            <CatalogProducts />
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 pb-10 sm:px-8 lg:pb-12 lg:pl-80">
          <Pagination />
        </div>
      </FadeIn>
    </section>
  );
}
