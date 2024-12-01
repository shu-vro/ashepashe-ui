"use client";

import { cn, removeTags } from "@/lib/utils";
import {
    Button,
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
            isFooterBlurred
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
                <b className="capitalize line-clamp-2 h-[4ch]">{name}</b>
                <div className="text-neutral-500 line-clamp-2 h-[4ch]">
                    {removeTags(description || "")}
                </div>
            </CardFooter>
            {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-0 shadow-small z-10 flex-col">
                <div className="capitalize flex flex-row items-center text-secondary">
                    <GrLocation className="text-xl" /> {where}
                </div>
                <b className="capitalize line-clamp-2 h-[4ch]">{name}</b>
                <div className="text-black/70 dark:text-white/80 line-clamp-2 h-[4ch]">
                    {removeTags(description || "")}
                </div>
            </CardFooter> */}
        </Card>
    );
}
