import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseRequestInput } from "@/lib/api/parse-request";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { UnauthorizedError, UpstreamError } from "@/lib/api-client";
import { getValidToken, invalidateToken } from "@/lib/auth/token";
import { orderIdSchema } from "@/lib/checkout/checkout.schemas";
import { requireEnv } from "@/lib/utils/require-env";

const UNSAFE_FILENAME_CHARS = /[^A-Za-z0-9-]/g;

interface RouteContext {
  params: Promise<{ id: string }>;
}
function toPdfFilename(id: string): string {
  return `pedido-${id.replace(UNSAFE_FILENAME_CHARS, "")}.pdf`;
}
async function fetchPdf(id: string, token: string) {
  const response = await fetch(
    `${requireEnv("API_URL")}/api/pedidos/${encodeURIComponent(id)}/pdf`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (!response.ok) {
    throw new UpstreamError(
      response.status,
      `Falha ao gerar PDF (HTTP ${response.status})`,
    );
  }
  return response;
}
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id: rawId } = await params;
  try {
    const id = parseRequestInput(rawId, orderIdSchema);
    let token = await getValidToken();
    let upstream: Response;
    try {
      upstream = await fetchPdf(id, token);
    } catch (error) {
      if (!(error instanceof UnauthorizedError)) throw error;
      await invalidateToken();
      token = await getValidToken();
      upstream = await fetchPdf(id, token);
    }
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${toPdfFilename(id)}"`,
      },
    });
  } catch (error) {
    return routeErrorResponse(error);
  }
}
