/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
    GOOGLE_VISION_API_KEY: process.env.GOOGLE_VISION_API_KEY,
  },
};

export default nextConfig;
