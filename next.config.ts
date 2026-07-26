import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/masjidfy-frontend",
  assetPrefix: "/masjidfy-frontend/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
