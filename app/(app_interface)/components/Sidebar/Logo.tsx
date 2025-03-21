"use client";

import Image from "next/image";
import AppIcon from "@/assets/favicon.png";

export default function () {
    return (
        <div className="flex items-center gap-2 flex-row">
            <Image
                src={AppIcon.src}
                alt="AAmarStore"
                className="block mx-auto object-cover h-10 max-mob:h-8 rounded-none"
                width={40}
                height={40}
                style={{
                    fill: "dodgerblue",
                }}
            />
            <div className="text-3xl max-mob:text-xl font-bold">
                <span className="text-red-500">Amar</span>
                <span className="text-blue-600">Store</span>
            </div>
        </div>
    );
}
