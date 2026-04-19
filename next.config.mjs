import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ice-cube-back.r-link.io",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.132.150",
        port:"8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "back.icecube-stores.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
