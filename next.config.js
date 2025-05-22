/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't run ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run TypeScript type checking during build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['image.tmdb.org', 'example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
  // Server-side configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  // Updated property name for Next.js 15
  experimental: {},
  // Moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['sharp', 'canvas'],
  webpack: (config) => {
    // Add webpack configuration if needed
    return config;
  },
};

module.exports = nextConfig;