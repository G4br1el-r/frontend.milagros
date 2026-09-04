import { NextResponse } from "next/server";
import type { CategoriaFiltroDto } from "@/components/Modules/Catalog/Home/Products/ProductFilters/filters.types";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
export async function GET() {
  try {
    const categorias = await withAuthRetry(() =>
      api.get<CategoriaFiltroDto[]>("/api/produtos/categorias"),
    );
    return NextResponse.json(categorias);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
