/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  allowedDevOrigins: [
    '**.run.app',
    '*.run.app',
    '**.us-east1.run.app',
    '*.us-east1.run.app',
    '**.google.com',
    'localhost',
    '127.0.0.1',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
