/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  // Optimize for Vercel deployment
  swcMinify: true,
  // Enable output file tracing for optimal bundle size
  output: 'standalone',
}

module.exports = nextConfig
