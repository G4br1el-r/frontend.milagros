import { describe, expect, it, vi } from "vitest";
import { InternalError, UnauthorizedError } from "@/lib/api-client";
import { invalidateToken } from "@/lib/auth/token";
import { withAuthRetry } from "./with-auth-retry";

vi.mock("@/lib/auth/token", () => ({
  invalidateToken: vi.fn(async () => {}),
}));

describe("withAuthRetry", () => {
  it("retorna o resultado direto quando a requisicao funciona", async () => {
    const request = vi.fn(async () => "ok");
    await expect(withAuthRetry(request)).resolves.toBe("ok");
    expect(request).toHaveBeenCalledTimes(1);
    expect(invalidateToken).not.toHaveBeenCalled();
  });

  it("invalida o token e tenta mais uma vez apos 401", async () => {
    const request = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new UnauthorizedError())
      .mockResolvedValueOnce("ok");
    await expect(withAuthRetry(request)).resolves.toBe("ok");
    expect(request).toHaveBeenCalledTimes(2);
    expect(invalidateToken).toHaveBeenCalledTimes(1);
    expect(vi.mocked(invalidateToken).mock.invocationCallOrder[0]).toBeLessThan(
      request.mock.invocationCallOrder[1],
    );
  });

  it("propaga a falha da segunda tentativa", async () => {
    const secondError = new UnauthorizedError("ainda sem acesso");
    const request = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new UnauthorizedError())
      .mockRejectedValueOnce(secondError);
    await expect(withAuthRetry(request)).rejects.toBe(secondError);
    expect(request).toHaveBeenCalledTimes(2);
    expect(invalidateToken).toHaveBeenCalledTimes(1);
  });

  it("propaga erro que nao e 401 sem invalidar o token", async () => {
    const error = new InternalError();
    const request = vi.fn<() => Promise<string>>().mockRejectedValue(error);
    await expect(withAuthRetry(request)).rejects.toBe(error);
    expect(request).toHaveBeenCalledTimes(1);
    expect(invalidateToken).not.toHaveBeenCalled();
  });

  it("propaga erro desconhecido sem invalidar o token", async () => {
    const error = new Error("falha qualquer");
    const request = vi.fn<() => Promise<string>>().mockRejectedValue(error);
    await expect(withAuthRetry(request)).rejects.toBe(error);
    expect(invalidateToken).not.toHaveBeenCalled();
  });
});
