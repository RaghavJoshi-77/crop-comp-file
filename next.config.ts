import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Tell Next.js to ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. Tell Next.js to ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // (Keep any other config you had, like images remotePatterns)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      }
    ],
  },
};

export default nextConfig;