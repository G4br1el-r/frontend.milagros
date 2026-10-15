import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { appToast } from "@/lib/toast/toast";
import { makeCartItem } from "@/test/fixtures";
import {
  type CartItem,
  migrateCartFromV0,
  useCartCount,
  useCartStore,
  useCartTotal,
} from "./cart";

vi.mock("@/lib/toast/toast", () => ({
  appToast: { cartAdded: vi.fn(), cartRemoved: vi.fn() },
}));

function productOf(id: string, price: number): Omit<CartItem, "quantity"> {
  return {
    id,
    productId: id,
    name: `Produto ${id}`,
    variantName: null,
    image: null,
    price,
  };
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

describe("variacoes no carrinho", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false, hasHydrated: false });
  });

  function variantOf(
    id: string,
    variantName: string,
    price: number,
  ): Omit<CartItem, "quantity"> {
    return {
      id,
      productId: "PAI-BYZANTINE",
      name: "Byzantine",
      variantName,
      image: null,
      price,
    };
  }

  it("tamanhos diferentes do mesmo produto viram linhas separadas", () => {
    const { addItem } = useCartStore.getState();
    addItem(variantOf("BYZi05B", "Barrica de 50g", 36.25));
    addItem(variantOf("BYZi30B", "Barrica de 300g", 179.77), 2);
    const { items } = useCartStore.getState();
    expect(items.map((item) => [item.id, item.quantity])).toEqual([
      ["BYZi05B", 1],
      ["BYZi30B", 2],
    ]);
  });

  it("a mesma variacao soma a quantidade", () => {
    const { addItem } = useCartStore.getState();
    addItem(variantOf("BYZi30B", "Barrica de 300g", 179.77));
    addItem(variantOf("BYZi30B", "Barrica de 300g", 179.77), 2);
    expect(useCartStore.getState().items).toEqual([
      { ...variantOf("BYZi30B", "Barrica de 300g", 179.77), quantity: 3 },
    ]);
  });
});

describe("migrateCartFromV0", () => {
  it("completa os campos novos dos itens antigos", () => {
    expect(
      migrateCartFromV0({
        items: [
          { id: "VELA1", name: "Vela", image: null, price: 10, quantity: 2 },
        ],
      }),
    ).toEqual({
      items: [
        {
          id: "VELA1",
          productId: "VELA1",
          name: "Vela",
          variantName: null,
          image: null,
          price: 10,
          quantity: 2,
        },
      ],
    });
  });

  it("descarta itens que guardaram o codigo do produto pai", () => {
    const { items } = migrateCartFromV0({
      items: [
        {
          id: "PAI-BYZANTINE",
          name: "Byzantine",
          image: null,
          price: 36.25,
          quantity: 1,
        },
        { id: "VELA1", name: "Vela", image: "x.png", price: 10, quantity: 1 },
      ],
    });
    expect(items.map((item) => item.id)).toEqual(["VELA1"]);
  });

  it("ignora dados invalidos", () => {
    expect(migrateCartFromV0(null)).toEqual({ items: [] });
    expect(migrateCartFromV0({ items: [{ id: 1 }] })).toEqual({ items: [] });
  });
});
