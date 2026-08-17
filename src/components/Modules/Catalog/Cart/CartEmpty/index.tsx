import { ShoppingBag } from "lucide-react";

export function CartEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary/5 text-primary/30">
        <ShoppingBag className="size-7" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-display text-lg text-primary">Seu carrinho está vazio</p>
        <p className="text-sm text-primary/55">Adicione incensos, carvões e alfaias ao seu carrinho.</p>
      </div>
    </div>
  );
}
