import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { parseRequestBody, parseRequestInput } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import {
  customerUpdateRequestSchema,
  documentSchema,
} from "@/lib/customer/customer.schemas";
import type { ClienteResponse } from "@/lib/customer/customer.types";

interface RouteContext {
  params: Promise<{ cpfCnpj: string }>;
}
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { cpfCnpj } = await params;
  try {
    const cpfCnpjDigits = parseRequestInput(cpfCnpj, documentSchema);
    const cliente = await withAuthRetry(() =>
      api.get<ClienteResponse>(
        `/api/clientes/cpf/${encodeURIComponent(cpfCnpjDigits)}`,
      ),
    );
    return NextResponse.json(cliente);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { cpfCnpj } = await params;
  try {
    const cpfCnpjDigits = parseRequestInput(cpfCnpj, documentSchema);
    const payload = await parseRequestBody(
      request,
      customerUpdateRequestSchema,
    );
    const cliente = await withAuthRetry(() =>
      api.put<ClienteResponse>(
        `/api/clientes/cpf/${encodeURIComponent(cpfCnpjDigits)}`,
        payload,
      ),
    );
    return NextResponse.json(cliente);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
