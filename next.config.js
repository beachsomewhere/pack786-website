/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Add your Supabase Storage domain here once photos are hosted there, e.g.:
      // { protocol: "https", hostname: "xxxx.supabase.co" },
    ],
  },
};
module.exports = nextConfig;
