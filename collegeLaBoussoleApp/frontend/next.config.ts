import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: process.env.NEXT_BASE_PATH ?? "",
  trailingSlash: true,
};

export default nextConfig;
