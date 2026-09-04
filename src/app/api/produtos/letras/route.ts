import { NextResponse } from "next/server";
import type { LetraFiltroDto } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
export async function GET() {
  try {
    const letras = await withAuthRetry(() =>
      api.get<LetraFiltroDto[]>("/api/produtos/letras"),
    );
    return NextResponse.json(letras);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
