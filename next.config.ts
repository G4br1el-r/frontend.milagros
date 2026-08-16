import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF primeiro (~20% menor que WebP), WebP como fallback.
    formats: ["image/avif", "image/webp"],
    // Provisório: as fotos dos produtos ainda não existem no catálogo próprio.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
