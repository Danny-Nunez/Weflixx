/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: { domains: ["images.weserv.nl", "img.rrmj.tv", "img.netpop.app", "img.rr.tv"] }
};

module.exports = nextConfig;
