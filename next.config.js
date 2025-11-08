/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "www.clipartmax.com",
      },
    ],
  },
  serverExternalPackages: [
    "@react-email/components",
    "@react-email/render",
    "@react-email/tailwind",
  ],
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore optional keyv adapters
      config.externals = config.externals || [];
      config.externals.push({
        '@keyv/redis': 'commonjs @keyv/redis',
        '@keyv/mongo': 'commonjs @keyv/mongo',
        '@keyv/sqlite': 'commonjs @keyv/sqlite',
        '@keyv/postgres': 'commonjs @keyv/postgres',
        '@keyv/mysql': 'commonjs @keyv/mysql',
        '@keyv/etcd': 'commonjs @keyv/etcd',
        '@keyv/offline': 'commonjs @keyv/offline',
        '@keyv/tiered': 'commonjs @keyv/tiered',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
