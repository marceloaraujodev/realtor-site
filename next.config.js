/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Enable if you use styled-components
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realtor-site.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;