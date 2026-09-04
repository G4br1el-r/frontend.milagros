import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import type { PedidoDetalhesDto } from "@/lib/checkout/checkout.types";

interface RouteContext {
  params: Promise<{ cpfCnpj: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { cpfCnpj } = await params;

  try {
    const pedidos = await withAuthRetry(() =>
      api.get<PedidoDetalhesDto[]>(
        `/api/pedidos/cpf/${encodeURIComponent(cpfCnpj)}`,
      ),
    );

    return NextResponse.json(pedidos);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
