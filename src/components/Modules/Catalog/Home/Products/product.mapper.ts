import {
  PRODUCT_FALLBACK_DESCRIPTION,
  PRODUCT_MAX_ATTRIBUTES,
} from "./product.constants";
import type {
  Product,
  ProductAttribute,
  ProdutoCatalogoDto,
} from "./product.types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractCategoryLabel(categoria: string): string {
  const segments = categoria.split("/").filter(Boolean);
  const id = segments.at(-1);
  return id ? `Categoria ${id}` : categoria;
}

function buildAttributes(dto: ProdutoCatalogoDto): ProductAttribute[] {
  const attributes: ProductAttribute[] = [];

  if (dto.pesoKg) {
    attributes.push({ label: "Peso", value: `${dto.pesoKg} kg` });
  }

  if (dto.tempoQueima) {
    attributes.push({ label: "Queima", value: dto.tempoQueima });
  }

  if (dto.tipo) {
    attributes.push({ label: "Tipo", value: dto.tipo });
  }

  if (dto.unidade) {
    attributes.push({ label: "Unidade", value: dto.unidade });
  }

  if (dto.altura && dto.largura && dto.profundidade) {
    attributes.push({
      label: "Dimensões",
      value: `${dto.altura} × ${dto.largura} × ${dto.profundidade}`,
    });
  }

  return attributes.slice(0, PRODUCT_MAX_ATTRIBUTES);
}

export function mapProdutoToProduct(dto: ProdutoCatalogoDto): Product {
  const images = dto.imagens?.filter(Boolean) ?? [];
  const image = images[0] ?? null;
  const description = dto.descricao ? stripHtml(dto.descricao) : "";

  return {
    id: dto.codigoOmie,
    name: dto.nome,
    description: description || PRODUCT_FALLBACK_DESCRIPTION,
    image,
    images,
    hasImage: Boolean(image),
    price: dto.preco,
    compareAtPrice: dto.precoDe && dto.precoDe > dto.preco ? dto.precoDe : null,
    category: dto.categoria ? extractCategoryLabel(dto.categoria) : null,
    type: dto.tipo,
    unit: dto.unidade,
    weightKg: dto.pesoKg,
    stock: dto.estoqueAtual,
    inStock: dto.estoqueAtual === null || dto.estoqueAtual > 0,
    burnTime: dto.tempoQueima,
    rating: dto.rating,
    reviewCount: dto.totalAvaliacoes ?? 0,
    attributes: buildAttributes(dto),
  };
}
