const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imbmi.ir",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
