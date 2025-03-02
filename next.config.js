// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;

const webpack = require('webpack');

module.exports = {
  experimental: {
    // Remove mongoose from here. Only include modules that are problematic on the client.
    serverComponentsExternalPackages: ['@mongodb-js/zstd', 'kerberos', 'snappy'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realtor-site.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@mongodb-js/zstd': false,
        kerberos: false,
        snappy: false,
        // Do NOT set mongoose: false here
      };
    }
    // Only ignore modules on the client-side if needed
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(?:@mongodb-js\/zstd|kerberos|snappy)$/,
      })
    );
    return config;
  },
};




