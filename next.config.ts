import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  // Remover isso caso exista:
  // webpack: () => {},
  // eslint: {},
};

export default nextConfig;
