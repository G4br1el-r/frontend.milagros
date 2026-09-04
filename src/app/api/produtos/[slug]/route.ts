import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseProductSlug } from "@/components/Modules/Catalog/Home/Products/product.slug";
import type { ProdutoCatalogoDto } from "@/components/Modules/Catalog/Home/Products/product.types";
import { api } from "@/lib/api";
import { routeErrorResponse } from "@/lib/api/route-error-response";
import { withAuthRetry } from "@/lib/api/with-auth-retry";
import { withPriceTableParams } from "@/lib/api/with-price-table";

/**
 * Código inexistente não vira 404 na API — ela devolve 200 com um
 * placeholder (`nome: "Produto"`, `preco: 0`, tudo mais nulo/vazio). Sem
 * este filtro, um link quebrado responderia 200 com uma página fantasma
 * em vez do 404 real.
 */
function isPlaceholderProduct(dto: ProdutoCatalogoDto): boolean {
  return dto.nome === "Produto" && dto.preco === 0 && !dto.categoria;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const codigoOmie = parseProductSlug(slug);
    const searchParams = await withPriceTableParams(new URLSearchParams());

    const produto = await withAuthRetry(() =>
      api.get<ProdutoCatalogoDto>(
        `/api/produtos/${encodeURIComponent(codigoOmie)}?${searchParams}`,
      ),
    );

    if (isPlaceholderProduct(produto)) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(produto);
  } catch (error) {
    return routeErrorResponse(error);
  }
}
