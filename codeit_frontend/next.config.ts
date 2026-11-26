import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 2단계. Next.js 서버가 /api/memos 요청을 Express(3001번)의 /memos로 전달한다.
  // 브라우저는 같은 출처(3000번)에 요청하므로 이 흐름에는 Express CORS 설정이 필요 없다.
  async rewrites() {
    const backendUrl = (
      process.env.BACKEND_URL ?? "http://127.0.0.1:3001"
    ).replace(/\/$/, "");

    return [
      { source: "/api/memos", destination: `${backendUrl}/memos` },
      { source: "/api/memos/:id", destination: `${backendUrl}/memos/:id` },
      {
        source: "/api/memos/:id/comments",
        destination: `${backendUrl}/memos/:id/comments`,
      },
      {
        source: "/api/better-auth/:path*",
        destination: `${backendUrl}/api/better-auth/:path*`,
      },
    ];
  },
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
