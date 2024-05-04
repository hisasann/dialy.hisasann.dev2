/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://github.com/vercel/next.js/discussions/32927
    domains: ['gravatar.com'],
  },
};

export default nextConfig;
