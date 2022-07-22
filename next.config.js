/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      "7VGrPchKx0e2DXc5Q93XpwIMcbwb6tKEOz-qc4J6qfoA-tJhSJFQm0qsS8OncLb_Twb443Vvlo8Ea1qtFM-2Uc4ApIv71WqlXEOp9GkcD3Dlqg",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
  
};

module.exports = nextConfig;
