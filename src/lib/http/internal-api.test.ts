import { describe, expect, it, vi } from "vitest";
import {
  extractApiMessage,
  type InternalApiErrorFactory,
  parseInternalApiResponse,
} from "./internal-api";

describe("extractApiMessage", () => {
  it("usa mensagem quando presente", () => {
    expect(
      extractApiMessage({ mensagem: "Pedido invalido", message: "outra" }),
    ).toBe("Pedido invalido");
  });

  it("usa message quando nao ha mensagem", () => {
    expect(extractApiMessage({ message: "Falhou" })).toBe("Falhou");
  });

  it("usa o primeiro texto de errors", () => {
    expect(
      extractApiMessage({
        errors: { email: ["E-mail invalido", "E-mail curto"], nome: ["Nome"] },
        title: "Validation failed",
      }),
    ).toBe("E-mail invalido");
  });

  it("usa title quando errors nao tem texto", () => {
    expect(
      extractApiMessage({ errors: { email: [1, 2] }, title: "Bad Request" }),
    ).toBe("Bad Request");
  });

  it("retorna undefined quando nenhuma mensagem e encontrada", () => {
    expect(extractApiMessage({ status: 400 })).toBeUndefined();
    expect(extractApiMessage(null)).toBeUndefined();
    expect(extractApiMessage("erro")).toBeUndefined();
  });
});

describe("parseInternalApiResponse", () => {
  it("retorna o JSON quando a resposta e ok", async () => {
    const factory = vi.fn<InternalApiErrorFactory>();
    const response = new Response(JSON.stringify({ id: "1" }), { status: 200 });
    await expect(
      parseInternalApiResponse<{ id: string }>(response, factory),
    ).resolves.toEqual({ id: "1" });
    expect(factory).not.toHaveBeenCalled();
  });

  it("lanca o erro criado pela factory com status, mensagem e corpo", async () => {
    const error = new Error("falha");
    const factory = vi.fn<InternalApiErrorFactory>(() => error);
    const body = { mensagem: "Pedido nao encontrado" };
    const response = new Response(JSON.stringify(body), { status: 404 });
    await expect(parseInternalApiResponse(response, factory)).rejects.toBe(
      error,
    );
    expect(factory).toHaveBeenCalledWith(404, "Pedido nao encontrado", body);
  });

  it("passa corpo nulo quando o erro nao e JSON", async () => {
    const error = new Error("falha");
    const factory = vi.fn<InternalApiErrorFactory>(() => error);
    const response = new Response("<html></html>", { status: 502 });
    await expect(parseInternalApiResponse(response, factory)).rejects.toBe(
      error,
    );
    expect(factory).toHaveBeenCalledWith(502, undefined, null);
  });
});
