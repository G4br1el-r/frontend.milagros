/**
 * Tempo de frescor por natureza do dado.
 *
 * Preco e estoque mudam ao longo do dia e sustentam decisao de compra: ficam
 * frescos por minutos. Metadados de filtro (categorias, letras, faixa de preco)
 * descrevem a forma do catalogo, nao o seu conteudo, e mudam quando um produto
 * entra ou sai de linha: podem viver horas em cache.
 */
export const PRODUCT_STALE_TIME_MS = 2 * 60 * 1000;

export const PRODUCT_GC_TIME_MS = 10 * 60 * 1000;

export const FILTER_METADATA_STALE_TIME_MS = 6 * 60 * 60 * 1000;

export const FILTER_METADATA_GC_TIME_MS = 12 * 60 * 60 * 1000;
