"use client";

import { Image } from "@nextui-org/react";
import React from "react";
import { cn, dynamicFakeImageGenerator, removeTags } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type Prop = {
    src: string;
};

export default function CompanyBanner({ src }: Prop) {
    const isMobile = useIsMobile();
    const dummyImage = dynamicFakeImageGenerator();
    return (
        <div className="grid-in-image">
            <Image
                src={dummyImage}
                className={cn(
                    "aspect-[16/5] m-6 object-cover w-[calc(100vw-3rem)]",
                    {
                        "w-[calc(100vw-3rem-16rem)]": !isMobile,
                    }
                )}
                isBlurred
                // removeWrapper
            />
        </div>
    );
}
