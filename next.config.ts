import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

// /** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: false,
};

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: "/app",
    // sw: "service-worker.js",
    //...
});

// Your Next config is automatically typed!
export default withPWA(nextConfig);
