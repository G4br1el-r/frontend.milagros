import { SITE_URL } from "./site.constants";

export function getSiteUrl(): string {
  return SITE_URL;
}
export function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
