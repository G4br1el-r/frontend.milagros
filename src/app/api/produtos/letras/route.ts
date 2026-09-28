import { NextResponse } from "next/server";
import type { LetraFiltroDto } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { FILTER_METADATA_REVALIDATE_SECONDS } from "@/components/Providers/query-provider.constants";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
export async function GET() {
  try {
    const letras = await withAuthRetry(() =>
      api.get<LetraFiltroDto[]>("/api/produtos/letras", {
        next: { revalidate: FILTER_METADATA_REVALIDATE_SECONDS },
      }),
    );
    return NextResponse.json(letras);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
