"use client";

import { Image } from "@heroui/react";
import React from "react";
import { cn, dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";
import NextImage from "next/image";

type Prop = {
    src: string;
    alt: string;
};

export default function CompanyBanner({ src, alt }: Prop) {
    return (
        <div className="grid-in-image">
            <Image
                src={toValidUrl(src)}
                // src={dummyImage}
                className={cn("aspect-[16/7] object-cover w-full !h-auto")}
                isBlurred
                classNames={{
                    wrapper: "m-6 w-full w-[calc(100vw-4rem)]",
                }}
                as={NextImage}
                alt={alt}
                width={1200}
                height={(1200 / 16) * 7}
                fallbackSrc={`https://placehold.co/400x300/2e2d51/3b82f6/685x300?text=${
                    alt?.replace(" ", "+") || "Company+Banner"
                }`}
                // removeWrapper
            />
        </div>
    );
}
