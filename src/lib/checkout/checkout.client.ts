import type {
  CheckoutRequest,
  CheckoutResponse,
  FinalizarCheckoutRequest,
  FinalizarCheckoutResponse,
  PedidoDetalhesDto,
} from "./checkout.types";
export class CheckoutApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "CheckoutApiError";
  }
}
function extractMessage(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const record = body as Record<string, unknown>;
  if (typeof record.mensagem === "string") return record.mensagem;
  if (typeof record.message === "string") return record.message;
  if (record.errors && typeof record.errors === "object") {
    const first = Object.values(record.errors as Record<string, unknown>)
      .flat()
      .find((value): value is string => typeof value === "string");
    if (first) return first;
  }
  if (typeof record.title === "string") return record.title;
  return undefined;
}
async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new CheckoutApiError(
      response.status,
      extractMessage(body) ?? `Falha no checkout (HTTP ${response.status})`,
      body,
    );
  }
  return response.json() as Promise<T>;
}
export async function validateCheckout(
  payload: CheckoutRequest,
): Promise<CheckoutResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<CheckoutResponse>(response);
}
export async function finalizeCheckout(
  payload: FinalizarCheckoutRequest,
): Promise<FinalizarCheckoutResponse> {
  const response = await fetch("/api/checkout/finalizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<FinalizarCheckoutResponse>(response);
}
export async function fetchOrder(id: string): Promise<PedidoDetalhesDto> {
  const response = await fetch(`/api/pedidos/${id}`);
  return parseJsonOrThrow<PedidoDetalhesDto>(response);
}
export async function fetchOrdersByDocument(
  cpfCnpj: string,
): Promise<PedidoDetalhesDto[]> {
  const digits = cpfCnpj.replace(/\D/g, "");
  const response = await fetch(`/api/pedidos/cpf/${digits}`);
  const pedidos = await parseJsonOrThrow<PedidoDetalhesDto[]>(response);
  return [...pedidos].sort(
    (a, b) =>
      new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime(),
  );
}
