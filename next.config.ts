import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./public/content/**/*'],
    '/[slug]': ['./public/content/**/*'],
  },
};

export default nextConfig;
