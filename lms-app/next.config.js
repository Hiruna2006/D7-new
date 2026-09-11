/** @type {import('next').NextConfig} */
const mainSite = process.env.NEXT_PUBLIC_SITE_URL || 'https://d7leos.org';
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { externalDir: true, scrollRestoration: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd7leos.org' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' }
    ],
    formats: ['image/webp', 'image/avif']
  },
  async rewrites() {
    return [
      { source: '/logos/:path*', destination: `${mainSite}/logos/:path*` },
      { source: '/images/:path*', destination: `${mainSite}/images/:path*` },
      { source: '/pdfs/:path*', destination: `${mainSite}/pdfs/:path*` }
    ];
  },
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.fallback = { ...(config.resolve.fallback || {}), canvas: false };
    return config;
  }
};
