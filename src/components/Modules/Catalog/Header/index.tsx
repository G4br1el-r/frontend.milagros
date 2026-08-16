import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { CART_ITEMS_COUNT } from "@/lib/utils/constants";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full pt-[env(safe-area-inset-top)]">
      <div className="relative mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-24 sm:px-6">
        <div />

        <Image
          src="/images/hero/milagros-logo.png"
          alt="Milagros"
          width={160}
          height={160}
          loading="eager"
          fetchPriority="high"
          className="h-10 w-auto object-contain sm:h-14"
        />

        <div className="flex justify-end">
          <button
            type="button"
            aria-label={`Carrinho${CART_ITEMS_COUNT > 0 ? ` (${CART_ITEMS_COUNT} itens)` : ""}`}
            className="relative flex size-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10 focus-visible:ring-2 focus-visible:ring-cream focus-visible:outline-none"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />

            {CART_ITEMS_COUNT > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-primary-darkest">
                {CART_ITEMS_COUNT}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
