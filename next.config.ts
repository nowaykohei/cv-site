import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BUILD_DATE: new Date().toISOString(),
  },
  outputFileTracingIncludes: {
    '/': ['./content/**/*'],
    '/[slug]': ['./content/**/*'],
  },
};

export default nextConfig;
