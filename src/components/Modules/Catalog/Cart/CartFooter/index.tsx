import { formatPrice } from "@/components/Modules/Catalog/Home/Products/product.types";

interface CartFooterProps {
  total: number;
}

export function CartFooter({ total }: CartFooterProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-primary/10 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary/60">Subtotal</span>
        <span className="font-display text-xl text-primary">
          {formatPrice(total)}
        </span>
      </div>

      <button
        type="button"
        className="relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full bg-linear-to-b from-gold-light to-gold px-6 py-3.5 text-[11px] font-bold tracking-[0.12em] text-primary-darkest uppercase transition-opacity duration-300 hover:opacity-90"
      >
        Finalizar compra
      </button>
    </div>
  );
}
