/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_ENDPOINT: process.env.API_ENDPOINT
  },
  images: {
    domains: ['control.vowrever.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'control.vowrever.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
