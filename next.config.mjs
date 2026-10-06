/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendApiUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL;

    if (!backendApiUrl) {
      throw new Error(
        "Set BACKEND_API_URL to the backend API base URL."
      );
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendApiUrl.replace(/\/+$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
