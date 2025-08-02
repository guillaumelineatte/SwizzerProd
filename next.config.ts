import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com', 'readdy.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'readdy.ai',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
