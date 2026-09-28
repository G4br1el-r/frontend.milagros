export type InternalApiErrorFactory = (
  status: number,
  message: string | undefined,
  body: unknown,
) => Error;
export function extractApiMessage(body: unknown): string | undefined {
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
export async function parseInternalApiResponse<T>(
  response: Response,
  errorFactory: InternalApiErrorFactory,
): Promise<T> {
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    throw errorFactory(response.status, extractApiMessage(body), body);
  }
  return response.json() as Promise<T>;
}
