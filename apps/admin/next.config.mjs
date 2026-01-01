/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Disable lazy compilation for better performance
  experimental: {
    optimizePackageImports: ["@workspace/ui", "lucide-react", "recharts"],
  },
}

export default nextConfig

