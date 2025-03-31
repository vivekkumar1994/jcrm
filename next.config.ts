/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "http", // Change to "http" for localhost
        hostname: "localhost",
        port: "3000", // Port your Next.js app is running on
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
