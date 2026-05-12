import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" retiré — le projet utilise maintenant des API routes (Vercel)
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
