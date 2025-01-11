"use client";
import React from "react";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    // const { products, companies } = await getAllProducts();
    return (
        <div className="my-4">
            <div className="flex justify-space-between items-center">
                <div className="items-center">
                    <h2 className="text-6xl font-bold my-3">
                        Build Your Store Within{" "}
                        <span className="text-blue-400">30 Seconds</span>
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <Button
                        className="my-2 bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-lg text-xl font-bold"
                        as={Link}
                        href="/home"
                        // size="large"
                    >
                        Get Started
                    </Button>
                </div>
                <div>
                    {/* <img src="/final.png"  alt="hero" /> */}
                    <Image
                        isBlurred
                        alt="NextUI Album Cover"
                        className="m-5"
                        src="/rmvbg.png"
                        width={1000}
                    />
                </div>
            </div>
        </div>
    );
}
