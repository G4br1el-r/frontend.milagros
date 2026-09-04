/**
 * Slug de produto: `nome-do-produto--CODIGO`.
 *
 * O nome vem primeiro porque é o que a pessoa lê e compartilha. O código
 * Omie vai no fim, atrás de um separador duplo, porque é ele que resolve o
 * produto na API — o nome sozinho não serve como identificador: pode ser
 * renomeado no Omie (e aí todo link compartilhado quebraria) e não há
 * garantia de unicidade vinda do backend.
 *
 * Com o sufixo, renomear o produto muda a URL bonita mas o link antigo
 * continua encontrando o produto certo — a página só redireciona para a
 * forma canônica. É o mesmo padrão de Medium/Dev.to (slug + id).
 *
 * Separador duplo (`--`) porque o slug do nome usa hífen simples; assim o
 * `split` no fim nunca corta um nome que contenha hífen.
 */

const SLUG_SEPARATOR = "--";

export function slugifyName(name: string): string {
  return (
    name
      .normalize("NFD")
      // Remove os diacríticos isolados pela normalização (ORATÓRIO -> ORATORIO).
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export function buildProductSlug(name: string, codigoOmie: string): string {
  const base = slugifyName(name);
  // Códigos Omie têm ponto e hífen (`7538.10-222`, `04.06342`). Encodar o
  // sufixo mantém o segmento de URL válido sem mexer na parte legível.
  const code = encodeURIComponent(codigoOmie);
  return base ? `${base}${SLUG_SEPARATOR}${code}` : code;
}

/**
 * Extrai o código Omie de um slug. Aceita também um código puro, para que
 * links antigos (`/produtos/1135SFA`) continuem funcionando.
 */
export function parseProductSlug(slug: string): string {
  const decoded = decodeURIComponent(slug);
  const index = decoded.lastIndexOf(SLUG_SEPARATOR);

  if (index === -1) return decoded;

  return decoded.slice(index + SLUG_SEPARATOR.length);
}
