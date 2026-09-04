import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF primeiro (~20% menor que WebP), WebP como fallback.
    formats: ["image/avif", "image/webp"],
    // Provisório: as fotos dos produtos ainda não existem no catálogo próprio.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.awsli.com.br" },
    ],
  },

  allowedDevOrigins: ["192.168.0.207"],
};

// ANALYZE=true pnpm build abre o relatorio de bundle no navegador ao final
// do build. Sem a env var, withBundleAnalyzer e um passthrough — nao muda o
// build normal.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
