import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./content/**/*'],
    '/[slug]': ['./content/**/*'],
  },
};

export default nextConfig;
