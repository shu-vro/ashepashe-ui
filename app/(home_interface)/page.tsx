"use client";
import React, { use } from "react";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "next-auth/react";

export default function Home() {
    const useUser = use(UserContext);
    // const { products, companies } = await getAllProducts();
    return (
        <div className="my-4">
            <div className="flex justify-space-between items-center max-md:flex-wrap max-md:mx-10">
                <div className="items-center">
                    <h2 className="text-6xl font-bold my-3">
                        Build Your Store Within{" "}
                        <span className="text-blue-400">30 Seconds</span>
                    </h2>
                    <p>
                        Take your business online without any tech skills! Build
                        a stunning store in 30 seconds with us . Your customers,
                        your rules. Start now!
                    </p>
                    <Button
                        className="my-2 bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-lg text-xl font-bold"
                        as={useUser?.user ? Link : Button}
                        onPress={async () => {
                            if (!useUser?.user)
                                await signIn("google", {
                                    redirectTo:
                                        location.href + "/my-store/create",
                                    redirect: false,
                                });
                        }}
                        href={
                            useUser?.user
                                ? `/my-store/${
                                      useUser?.userCompany ? "update" : "create"
                                  }`
                                : "/"
                        }
                        // size="large"
                    >
                        {useUser?.user
                            ? useUser.userCompany
                                ? "Update Your Store"
                                : "Create Your Store"
                            : "Get Started"}
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
