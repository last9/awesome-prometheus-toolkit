/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ hostname: "cdn.simpleicons.org" }],
  },
};

export default nextConfig;
