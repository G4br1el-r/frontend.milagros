import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const DEFAULT_DEV_ORIGINS = ["192.168.0.154"];

const allowedDevOrigins = [
  ...new Set([
    ...DEFAULT_DEV_ORIGINS,
    ...(process.env.ALLOWED_DEV_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ]),
];

const HSTS_MAX_AGE_IN_SECONDS = 63072000;

const REMOTE_IMAGE_HOSTNAMES = ["images.unsplash.com", "cdn.awsli.com.br"];

const remoteImageSources = REMOTE_IMAGE_HOSTNAMES.map(
  (hostname) => `https://${hostname}`,
).join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  `img-src 'self' data: blob: ${remoteImageSources}`,
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: `max-age=${HSTS_MAX_AGE_IN_SECONDS}; includeSubDomains; preload`,
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: REMOTE_IMAGE_HOSTNAMES.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },

  allowedDevOrigins,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
