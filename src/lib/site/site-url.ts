import { requireEnv } from "@/lib/utils/require-env";
import { DEV_FALLBACK_SITE_URL } from "./site.constants";

export function getSiteUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return requireEnv("NEXT_PUBLIC_SITE_URL");
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEV_FALLBACK_SITE_URL;
}
export function toAbsoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}
