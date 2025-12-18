import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brandemia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.another-site.com',
      },
    ],
  }
};

export default nextConfig;
