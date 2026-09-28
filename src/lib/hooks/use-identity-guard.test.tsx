import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "@/lib/stores/cart";
import { useCheckoutStore } from "@/lib/stores/checkout";
import { useCustomerStore } from "@/lib/stores/customer";
import { makeCustomer } from "@/test/fixtures";
import { useIdentityGuard } from "./use-identity-guard";

vi.mock("@/lib/toast/toast", () => ({
  appToast: { cartAdded: vi.fn(), cartRemoved: vi.fn() },
}));

const product = { id: "a", name: "Vela", image: null, price: 10 };

describe("useIdentityGuard", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false, hasHydrated: true });
    useCustomerStore.setState({
      customer: null,
      step: "idle",
      pendingIntent: null,
      draftDocument: "",
    });
    useCheckoutStore.getState().reset();
  });

  describe("cliente identificado", () => {
    beforeEach(() => {
      useCustomerStore.setState({ customer: makeCustomer() });
    });

    it("adiciona ao carrinho direto", () => {
      const { result } = renderHook(() => useIdentityGuard());
      expect(result.current.isIdentified).toBe(true);
      act(() => {
        result.current.addToCart(product, 2);
      });
      expect(useCartStore.getState().items).toEqual([
        { ...product, quantity: 2 },
      ]);
      expect(useCustomerStore.getState().step).toBe("idle");
      expect(useCustomerStore.getState().pendingIntent).toBeNull();
    });

    it("abre o checkout do zero e fecha o carrinho", () => {
      useCartStore.setState({ isOpen: true });
      useCheckoutStore.setState({ step: "pagamento", observacoes: "antiga" });
      const { result } = renderHook(() => useIdentityGuard());
      act(() => {
        result.current.checkout();
      });
      const checkout = useCheckoutStore.getState();
      expect(useCartStore.getState().isOpen).toBe(false);
      expect(checkout.isOpen).toBe(true);
      expect(checkout.step).toBe("revisao");
      expect(checkout.observacoes).toBe("");
    });
  });

  describe("cliente nao identificado", () => {
    it("pede identificacao guardando a intencao de adicionar ao carrinho", () => {
      const { result } = renderHook(() => useIdentityGuard());
      expect(result.current.isIdentified).toBe(false);
      act(() => {
        result.current.addToCart(product);
      });
      const customerState = useCustomerStore.getState();
      expect(useCartStore.getState().items).toEqual([]);
      expect(customerState.step).toBe("document");
      expect(customerState.pendingIntent).toEqual({
        type: "add-to-cart",
        item: product,
        quantity: 1,
      });
    });

    it("pede identificacao guardando a intencao de checkout", () => {
      const { result } = renderHook(() => useIdentityGuard());
      act(() => {
        result.current.checkout();
      });
      expect(useCustomerStore.getState().pendingIntent).toEqual({
        type: "checkout",
      });
      expect(useCheckoutStore.getState().isOpen).toBe(false);
    });
  });

  it("runIntent executa a intencao pendente sem checar identidade", () => {
    const { result } = renderHook(() => useIdentityGuard());
    act(() => {
      result.current.runIntent({
        type: "add-to-cart",
        item: product,
        quantity: 3,
      });
    });
    expect(useCartStore.getState().items).toEqual([
      { ...product, quantity: 3 },
    ]);
  });
});
