import { TableCell, User } from "@heroui/react";
import Image from "next/image";
import React from "react";

export default function ProductTableCell({
    name,
    price,
    image1,
}: {
    name: string;
    price: number;
    image1: string;
}) {
    return (
        <>
            <div className="flex justify-start">
                <User
                    avatarProps={{
                        radius: "lg",
                        ImgComponent: Image,
                        imgProps: {
                            width: 50,
                            height: 50,
                        },
                        src: image1!,
                        classNames: {
                            base: "shrink-0",
                        },
                    }}
                    description={"৳ " + price}
                    name={name}
                    classNames={{
                        name: "text-start",
                        description: "text-start",
                    }}
                />
            </div>
        </>
    );
}
