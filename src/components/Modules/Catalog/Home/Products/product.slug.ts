const SLUG_SEPARATOR = "--";
export function slugifyName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function buildProductSlug(name: string, codigoOmie: string): string {
  const base = slugifyName(name);
  const code = encodeURIComponent(codigoOmie);
  return base ? `${base}${SLUG_SEPARATOR}${code}` : code;
}
export function parseProductSlug(slug: string): string {
  const decoded = decodeURIComponent(slug);
  const index = decoded.lastIndexOf(SLUG_SEPARATOR);
  if (index === -1) return decoded;
  return decoded.slice(index + SLUG_SEPARATOR.length);
}
