import { parseInternalApiResponse } from "@/lib/http/internal-api";
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
function parseJsonOrThrow<T>(response: Response): Promise<T> {
  return parseInternalApiResponse<T>(
    response,
    (status, message, body) =>
      new CheckoutApiError(
        status,
        message ?? `Falha no checkout (HTTP ${status})`,
        body,
      ),
  );
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
