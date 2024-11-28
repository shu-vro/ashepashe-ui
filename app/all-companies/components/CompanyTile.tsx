"use client";

import { cn, removeTags } from "@/lib/utils";
import {
    Card,
    CardBody,
    CardFooter,
    CardProps,
    Image,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GrLocation } from "react-icons/gr";

export default function CompanyTile({
    name,
    imageUrl,
    where,
    description,
    slug,
    ...rest
}: {
    name: string;
    imageUrl: string;
    where: string;
    description: string;
    slug: string;
} & CardProps) {
    return (
        <Card
            shadow="sm"
            isPressable
            as={Link}
            href={`/all-companies/${slug}`}
            onClick={() => console.log("item pressed")}
            {...rest}
            className={cn("w-full max-h-[420px]", rest?.className || "")}>
            <CardBody className="overflow-visible p-4">
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={name}
                    className="w-full aspect-[4/3] object-cover"
                    src={imageUrl}
                    isBlurred
                />
            </CardBody>
            <CardFooter className="p-4 pt-0 text-start flex-col justify-start w-full items-start">
                <div className="capitalize flex flex-row items-center text-secondary">
                    <GrLocation className="text-xl" /> {where}
                </div>
                <b className="capitalize line-clamp-2">{name}</b>
                <div className="text-neutral-500 line-clamp-2">
                    {removeTags(description || "")}
                </div>
            </CardFooter>
        </Card>
    );
}
