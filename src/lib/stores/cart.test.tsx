import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { appToast } from "@/lib/toast/toast";
import { makeCartItem } from "@/test/fixtures";
import {
  type CartItem,
  useCartCount,
  useCartStore,
  useCartTotal,
} from "./cart";

vi.mock("@/lib/toast/toast", () => ({
  appToast: { cartAdded: vi.fn(), cartRemoved: vi.fn() },
}));

function productOf(id: string, price: number): Omit<CartItem, "quantity"> {
  return { id, name: `Produto ${id}`, image: null, price };
}

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false, hasHydrated: false });
    window.localStorage.clear();
  });

  it("adiciona item novo com quantidade padrao 1", () => {
    useCartStore.getState().addItem(productOf("a", 10));
    expect(useCartStore.getState().items).toEqual([
      { ...productOf("a", 10), quantity: 1 },
    ]);
    expect(appToast.cartAdded).toHaveBeenCalledTimes(1);
  });

  it("soma a quantidade quando o item ja existe", () => {
    const { addItem } = useCartStore.getState();
    addItem(productOf("a", 10), 2);
    addItem(productOf("a", 10), 3);
    addItem(productOf("b", 5));
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(2);
    expect(items.find((item) => item.id === "a")?.quantity).toBe(5);
    expect(items.find((item) => item.id === "b")?.quantity).toBe(1);
  });

  it("remove item", () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(productOf("a", 10));
    addItem(productOf("b", 5));
    removeItem("a");
    expect(useCartStore.getState().items.map((item) => item.id)).toEqual(["b"]);
    expect(appToast.cartRemoved).toHaveBeenCalledTimes(1);
  });

  it("atualiza a quantidade", () => {
    const { addItem, setQuantity } = useCartStore.getState();
    addItem(productOf("a", 10));
    setQuantity("a", 4);
    expect(useCartStore.getState().items[0]?.quantity).toBe(4);
    expect(appToast.cartRemoved).not.toHaveBeenCalled();
  });

  it("remove o item quando a quantidade e zero ou negativa", () => {
    const { addItem, setQuantity } = useCartStore.getState();
    addItem(productOf("a", 10));
    addItem(productOf("b", 5));
    setQuantity("a", 0);
    setQuantity("b", -1);
    expect(useCartStore.getState().items).toEqual([]);
    expect(appToast.cartRemoved).toHaveBeenCalledTimes(2);
  });

  it("limpa o carrinho", () => {
    const { addItem, clear } = useCartStore.getState();
    addItem(productOf("a", 10));
    clear();
    expect(useCartStore.getState().items).toEqual([]);
  });
});

describe("useCartTotal", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false, hasHydrated: false });
  });

  it("soma preco vezes quantidade", () => {
    useCartStore.setState({
      items: [
        makeCartItem({ id: "a", price: 10, quantity: 2 }),
        makeCartItem({ id: "b", price: 2.5, quantity: 4 }),
      ],
    });
    const { result } = renderHook(() => useCartTotal());
    expect(result.current).toBe(30);
  });

  it("atualiza quando o carrinho muda", () => {
    const { result } = renderHook(() => useCartTotal());
    expect(result.current).toBe(0);
    act(() => {
      useCartStore.getState().addItem(productOf("a", 7), 3);
    });
    expect(result.current).toBe(21);
  });
});

describe("useCartCount", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [
        makeCartItem({ id: "a", quantity: 2 }),
        makeCartItem({ id: "b", quantity: 3 }),
      ],
      isOpen: false,
      hasHydrated: false,
    });
  });

  it("retorna null antes da hidratacao", () => {
    const { result } = renderHook(() => useCartCount());
    expect(result.current).toBeNull();
  });

  it("soma as quantidades apos a hidratacao", () => {
    act(() => {
      useCartStore.getState().setHasHydrated(true);
    });
    const { result } = renderHook(() => useCartCount());
    expect(result.current).toBe(5);
  });
});
