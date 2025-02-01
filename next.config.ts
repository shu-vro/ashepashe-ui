import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

// /** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "**asepashe.com",
            },
            {
                hostname: "**googleusercontent.com",
            },
            {
                hostname: "nextui.org",
            },
        ],
    },
};

const withPWA = withPWAInit({
    dest: "public",
    disable: false,
    register: true,
    // disable: process.env.NODE_ENV === "development",
    // disable: false,
    // scope: "/app",
    // sw: "service-worker.js",
    //...
});

// Your Next config is automatically typed!
export default withPWA(nextConfig);
