import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/transparent-stewardship", destination: "/support", permanent: true },
      { source: "/history-and-faq", destination: "/learn", permanent: true },
    ];
  },
};

export default nextConfig;
