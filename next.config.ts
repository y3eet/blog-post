import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
