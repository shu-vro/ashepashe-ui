"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GrLocation } from "react-icons/gr";

export default function CompanyTile({
    name,
    imageUrl,
    where,
    description,
}: {
    name: string;
    imageUrl: string;
    where: string;
    description: string;
}) {
    return (
        <Card
            shadow="sm"
            isPressable
            as={Link}
            href={`/all-companies/${name.split(" ").join("-")}`}
            className="w-full min-h-[450px]"
            onClick={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-4">
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={name}
                    className="w-full aspect-[4/3] object-cover"
                    // src={imageUrl}
                    isBlurred
                    src={`https://nextui.org/images/fruit-${
                        Math.floor(Math.random() * 7) + 1
                    }.jpeg`}
                />
            </CardBody>
            <CardFooter className="p-4 pt-0 text-start flex-col justify-start w-full items-start">
                <div className="capitalize flex flex-row items-center">
                    <GrLocation className="text-xl" /> {where}
                </div>
                <b className="capitalize">{name}</b>
                <div className="text-neutral-500 line-clamp-2">
                    {description}
                </div>
            </CardFooter>
        </Card>
    );
}
