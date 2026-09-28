import { DEV_FALLBACK_SITE_URL } from "./site.constants";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEV_FALLBACK_SITE_URL;
}
export function toAbsoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}
