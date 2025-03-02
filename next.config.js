// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;

const nextConfig = {
  webpack(config, { isServer }) {
    // Exclude native modules from Webpack processing
    if (!isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'noop-loader', // Ignores these files during the build
      });
    }
    return config;
  },
};

module.exports = nextConfig;


