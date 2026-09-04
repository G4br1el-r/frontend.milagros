import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { isAppError } from "@/lib/api-client";
import type {
  ClienteCadastroRequest,
  ClienteResponse,
} from "@/lib/customer/customer.types";
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ClienteCadastroRequest;
    const cliente = await withAuthRetry(() =>
      api.post<ClienteResponse>("/api/clientes", payload),
    );
    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    if (isAppError(error) && error.statusCode >= 500) {
      console.error("[POST /api/clientes] falha no upstream", {
        status: error.statusCode,
        message: error.message,
        details: error.details,
      });
    }
    return routeErrorResponse(error);
  }
}
