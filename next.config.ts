import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/SwizzerProd' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/SwizzerProd' : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
