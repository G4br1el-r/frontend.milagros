import { create } from "zustand";
import type { Product } from "@/components/Modules/Catalog/Home/Products/product.types";

interface ProductDetailState {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

export const useProductDetailStore = create<ProductDetailState>()((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}));
