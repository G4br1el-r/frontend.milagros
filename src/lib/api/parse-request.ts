import type { NextRequest } from "next/server";
import type { z } from "zod";
import { BadRequestError } from "@/lib/api-client";
export function parseRequestInput<T extends z.ZodType>(
  input: unknown,
  schema: T,
): z.output<T> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new BadRequestError();
  }
  return parsed.data;
}
export async function parseRequestBody<T extends z.ZodType>(
  request: NextRequest,
  schema: T,
): Promise<z.output<T>> {
  const body: unknown = await request.json().catch(() => undefined);
  return parseRequestInput(body, schema);
}
export function parseSearchParams<T extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: T,
): z.output<T> {
  return parseRequestInput(Object.fromEntries(searchParams), schema);
}
