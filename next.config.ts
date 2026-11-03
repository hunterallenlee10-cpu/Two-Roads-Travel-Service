import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Old site page names map to their new homes.
    return [
      { source: "/customer-service", destination: "/contact#customer-service", permanent: false },
      { source: "/travel-resources", destination: "/resources", permanent: false },
      { source: "/why-use-a-travel-advisor", destination: "/why-an-advisor", permanent: false },
      { source: "/sporting-and-active", destination: "/sporting-active", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
