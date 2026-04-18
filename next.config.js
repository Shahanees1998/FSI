/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/agent/efa/data-input-full",
        destination: "/agent/clients/create",
        permanent: true,
      },
      {
        source: "/agent/efa/data-input-lite",
        destination: "/agent/clients/create",
        permanent: true,
      },
      {
        source: "/agent/efa",
        destination: "/agent/clients",
        permanent: true,
      },
      {
        source: "/agent/efa/:path*",
        destination: "/agent/clients",
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
    unoptimized: true, // For Vercel deployment compatibility
  },
  experimental: {
    serverComponentsExternalPackages: ['chart.js'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'canvas'];
    return config;
  },
}

module.exports = nextConfig
