/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "psnobj.prod.dl.playstation.net",
      "image.api.playstation.com",
      "store-images.s-microsoft.com",
    ],
  },
};

export default nextConfig;
