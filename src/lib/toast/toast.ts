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
function productsLoadError(message?: string) {
  toast.error(message ?? "Não foi possível carregar os produtos", {
    id: TOAST_IDS.productsError,
    duration: TOAST_DURATION_MS,
  });
}
function accountUpdated() {
  toast.success("Dados atualizados", {
    id: TOAST_IDS.account,
    duration: TOAST_DURATION_MS,
  });
}
export const appToast = {
  cartAdded,
  cartRemoved,
  filtersCleared,
  productsLoadError,
  accountUpdated,
};
