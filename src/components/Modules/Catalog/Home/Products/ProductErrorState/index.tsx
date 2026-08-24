import { TriangleAlert } from "lucide-react";
import { PRODUCT_LOAD_ERROR_MESSAGE } from "../product.constants";

interface ProductErrorStateProps {
  message?: string;
}

export function ProductErrorState({ message }: ProductErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-terracotta/20 bg-terracotta/5 px-6 py-20 text-center">
      <TriangleAlert
        className="size-10 text-terracotta"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl text-primary">
          Não foi possível carregar os produtos
        </h3>
        <p className="max-w-sm text-sm text-primary/60">
          {message ?? PRODUCT_LOAD_ERROR_MESSAGE}
        </p>
      </div>
    </div>
  );
}
