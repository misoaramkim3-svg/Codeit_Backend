import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    instantInsights: {
      validationLevel: "manual-warning",
    },
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        search: "?w=800&h=600&fit=crop&q=80",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/id/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/**",
        search: "",
      },
    ],
  },
  partialPrefetching: true,
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
