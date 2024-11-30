"use client";

import { Image } from "@nextui-org/react";
import React from "react";
import { cn, dynamicFakeImageGenerator } from "@/lib/utils";

type Prop = {
    src: string;
};

export default function CompanyBanner({ src }: Prop) {
    const dummyImage = dynamicFakeImageGenerator();
    return (
        <div className="grid-in-image">
            <Image
                src={dummyImage}
                className={cn(
                    "aspect-[16/5] object-cover w-[calc(100vw-3rem)]"
                )}
                isBlurred
                classNames={{
                    wrapper: "m-6",
                }}
                // removeWrapper
            />
        </div>
    );
}
