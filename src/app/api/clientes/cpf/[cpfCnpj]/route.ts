import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import type { ClienteResponse } from "@/lib/customer/customer.types";

interface RouteContext {
  params: Promise<{ cpfCnpj: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { cpfCnpj } = await params;

  try {
    const cliente = await withAuthRetry(() =>
      api.get<ClienteResponse>(
        `/api/clientes/cpf/${encodeURIComponent(cpfCnpj)}`,
      ),
    );

    return NextResponse.json(cliente);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
