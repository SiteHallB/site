import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Paquets chargés depuis node_modules côté serveur (non bundlés) :
  // évite les doubles instances de drizzle/libsql qui cassent les requêtes Payload.
  serverExternalPackages: ["@payloadcms/db-sqlite", "drizzle-orm", "@libsql/client", "libsql"],
  images: {
    // Sert l'AVIF en priorité (≈ 20-30 % plus léger que le WebP), repli WebP.
    formats: ["image/avif", "image/webp"],
    // Images de la médiathèque servies par Vercel Blob (production).
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
      {
        // Assets statiques (posters, polices) : cache long pour le score Lighthouse.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
