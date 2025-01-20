"use client";

import { Image } from "@heroui/react";
import AppIcon from "@/assets/she.png";

export default function () {
    return (
        <Image
            src={AppIcon.src}
            alt="AAmarStore"
            className="block mx-auto object-cover h-16"
            removeWrapper
        />
    );
}
