import { parseInternalApiResponse } from "@/lib/http/internal-api";
import type {
  ClienteAtualizarRequest,
  ClienteCadastroRequest,
  ClienteResponse,
  EnderecoCepDto,
} from "./customer.types";
export class CustomerNotFoundError extends Error {
  constructor() {
    super("Cliente nao encontrado");
    this.name = "CustomerNotFoundError";
  }
}
export class CustomerApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "CustomerApiError";
  }
}
function parseJsonOrThrow<T>(response: Response): Promise<T> {
  return parseInternalApiResponse<T>(
    response,
    (status, message, body) =>
      new CustomerApiError(
        status,
        message ?? `Falha na API de clientes (HTTP ${status})`,
        body,
      ),
  );
}
export async function fetchCustomerByDocument(
  cpfCnpj: string,
): Promise<ClienteResponse> {
  const digits = cpfCnpj.replace(/\D/g, "");
  const response = await fetch(`/api/clientes/cpf/${digits}`);
  if (response.status === 404) {
    throw new CustomerNotFoundError();
  }
  return parseJsonOrThrow<ClienteResponse>(response);
}
export async function createCustomer(
  payload: ClienteCadastroRequest,
): Promise<ClienteResponse> {
  const response = await fetch("/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<ClienteResponse>(response);
}
export async function fetchAddressByCep(cep: string): Promise<EnderecoCepDto> {
  const digits = cep.replace(/\D/g, "");
  const response = await fetch(`/api/enderecos/${digits}`);
  return parseJsonOrThrow<EnderecoCepDto>(response);
}
export async function updateCustomer(
  cpfCnpj: string,
  payload: ClienteAtualizarRequest,
): Promise<ClienteResponse> {
  const digits = cpfCnpj.replace(/\D/g, "");
  const response = await fetch(`/api/clientes/cpf/${digits}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonOrThrow<ClienteResponse>(response);
}
