import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"], // permite imagens do login Google
  },
  // desabilita o edge runtime, útil para evitar erros com MongoDB
  output: "standalone",
};

export default nextConfig;

