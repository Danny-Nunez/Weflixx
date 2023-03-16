/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: { domains: ["images.weserv.nl", "img.rrmj.tv", "img.netpop.app", "img.rr.tv"] },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://weflixx.com" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;