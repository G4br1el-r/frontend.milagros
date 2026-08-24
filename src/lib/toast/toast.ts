import toast from "react-hot-toast";
import { TOAST_DURATION_MS, TOAST_IDS } from "./toast.constants";

function cartAdded() {
  toast.success("Adicionado ao carrinho", {
    id: TOAST_IDS.cart,
    duration: TOAST_DURATION_MS,
  });
}

function cartRemoved() {
  toast.success("Removido do carrinho", {
    id: TOAST_IDS.cart,
    duration: TOAST_DURATION_MS,
  });
}

function filtersCleared() {
  toast(`Filtros limpos`, {
    id: TOAST_IDS.filters,
    duration: TOAST_DURATION_MS,
  });
}

function filtersApplied(resultCount: Promise<number>) {
  toast.promise(
    resultCount,
    {
      loading: "Buscando produtos…",
      success: (count) =>
        count > 0
          ? `${count} ${count === 1 ? "produto encontrado" : "produtos encontrados"}`
          : "Nenhum produto encontrado",
      error: "Não foi possível buscar os produtos",
    },
    { id: TOAST_IDS.filters, duration: TOAST_DURATION_MS },
  );
}

function productsLoadError(message?: string) {
  toast.error(message ?? "Não foi possível carregar os produtos", {
    id: TOAST_IDS.productsError,
    duration: TOAST_DURATION_MS,
  });
}

export const appToast = {
  cartAdded,
  cartRemoved,
  filtersCleared,
  filtersApplied,
  productsLoadError,
};
