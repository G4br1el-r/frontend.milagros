import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF primeiro (~20% menor que WebP), WebP como fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
