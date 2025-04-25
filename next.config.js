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
};

module.exports = nextConfig;