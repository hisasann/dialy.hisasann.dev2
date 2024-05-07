/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSG
  //  ⨯ Error: Page "/[slug]/page" is missing param "/2024-05-05" in "generateStaticParams()", which is required with "output: export" config.
  // output: 'export',
  images: {
    // https://github.com/vercel/next.js/discussions/32927
    domains: ['gravatar.com'],
  },
};

export default nextConfig;
