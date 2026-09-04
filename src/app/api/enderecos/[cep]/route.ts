import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import type { EnderecoCepDto } from "@/lib/customer/customer.types";

interface RouteContext {
  params: Promise<{ cep: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { cep } = await params;
  const digits = cep.replace(/\D/g, "");

  try {
    const endereco = await withAuthRetry(() =>
      api.get<EnderecoCepDto>(`/api/enderecos/${digits}`),
    );

    return NextResponse.json(endereco);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
