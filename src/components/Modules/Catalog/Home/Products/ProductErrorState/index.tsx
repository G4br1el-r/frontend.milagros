import { RotateCw, TriangleAlert } from "lucide-react";
import { PRODUCT_LOAD_ERROR_MESSAGE } from "../product.constants";

interface ProductErrorStateProps {
  onRetry?: () => void;
}
export function ProductErrorState({ onRetry }: ProductErrorStateProps) {
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
          {PRODUCT_LOAD_ERROR_MESSAGE}
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-primary-darkest focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <RotateCw className="size-4" strokeWidth={2} />
          Tentar de novo
        </button>
      )}
    </div>
  );
}
