import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { logUpstreamFailure } from "@/lib/api/log-upstream-failure";
import { parseRequestBody } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { customerCreateRequestSchema } from "@/lib/customer/customer.schemas";
import type { ClienteResponse } from "@/lib/customer/customer.types";
export async function POST(request: NextRequest) {
  try {
    const payload = await parseRequestBody(
      request,
      customerCreateRequestSchema,
    );
    const cliente = await withAuthRetry(() =>
      api.post<ClienteResponse>("/api/clientes", payload),
    );
    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    logUpstreamFailure("POST /api/clientes", error);
    return routeErrorResponse(error);
  }
}
