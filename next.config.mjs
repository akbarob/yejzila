/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export',

    // Transpile Sanity packages so Next.js can bundle them correctly.
    // Required for the embedded Sanity Studio at /studio and for next-sanity.
    transpilePackages: ['next-sanity', 'sanity'],

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
