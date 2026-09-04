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
    throw new CustomerApiError(
      response.status,
      extractMessage(body) ??
        `Falha na API de clientes (HTTP ${response.status})`,
      body,
    );
  }
  return response.json() as Promise<T>;
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
