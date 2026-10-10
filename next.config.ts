import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: every page is prerendered to /out at build time.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
