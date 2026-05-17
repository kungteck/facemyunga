import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — produces ./out directory that any static host
  // (Cloudflare Pages, GitHub Pages, S3, etc.) can serve directly.
  output: "export",
  // Required when using `output: 'export'` — disables Next.js' built-in
  // server-side image optimization. Our images are pre-sized and the
  // Cloudflare CDN will handle compression/caching at the edge.
  images: {
    unoptimized: true,
  },
  // Add trailing slashes for cleaner static hosting (matches CF Pages default)
  trailingSlash: true,
};

export default nextConfig;
