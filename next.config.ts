import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cip_0217",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
