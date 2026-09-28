import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPriceTableCode } from "@/lib/auth/token";
import { withPriceTableParams } from "./with-price-table";

vi.mock("@/lib/auth/token", () => ({
  getPriceTableCode: vi.fn(),
}));

describe("withPriceTableParams", () => {
  beforeEach(() => {
    vi.mocked(getPriceTableCode).mockResolvedValue("TP-9");
  });

  it("adiciona codigoTabelaPreco mantendo os demais parametros", async () => {
    const params = await withPriceTableParams(
      new URLSearchParams("q=vela&pagina=2"),
    );
    expect(params.get("codigoTabelaPreco")).toBe("TP-9");
    expect(params.get("q")).toBe("vela");
    expect(params.get("pagina")).toBe("2");
  });

  it("sobrescreve codigoTabelaPreco vindo do cliente", async () => {
    const params = await withPriceTableParams(
      new URLSearchParams("codigoTabelaPreco=OUTRA"),
    );
    expect(params.getAll("codigoTabelaPreco")).toEqual(["TP-9"]);
  });

  it("nao altera os parametros originais", async () => {
    const original = new URLSearchParams("q=vela");
    await withPriceTableParams(original);
    expect(original.has("codigoTabelaPreco")).toBe(false);
  });
});
