/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACK_URL: "https://localhost:3001",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
