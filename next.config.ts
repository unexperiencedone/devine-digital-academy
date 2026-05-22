import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://connect.facebook.net https://www.facebook.com https://img.youtube.com https://i.ytimg.com; font-src 'self' data:; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com; connect-src 'self' https://connect.facebook.net https://www.facebook.com; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
