"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardProps,
    Chip,
    Divider,
    Image,
    User,
} from "@nextui-org/react";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { cn, removeTags } from "@/lib/utils";
import { BsCart3 } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";

interface ProductCardProps {
    name: string;
    actualPrice: number;
    discountPrice: number;
    seller: string;
    sellerAvatar: string;
    // rating: number;
    imageUrl: string;
    description?: string;
    disableCompany?: boolean;
    link: string;
    sellerLink?: string;
}

export function ProductCard({
    name,
    imageUrl,
    actualPrice,
    discountPrice,
    seller,
    sellerAvatar,
    // rating,
    description,
    link,
    disableCompany = false,
    sellerLink = "#",
    ...rest
}: ProductCardProps & CardProps) {
    const discountPercent = ((discountPrice / actualPrice) * 100).toFixed(0);
    return (
        <Card
            shadow="sm"
            // shadow="none"
            isPressable
            as={"div"}
            {...rest}
            className={cn("w-48 md:w-72", rest?.className || "")}>
            <CardHeader className="overflow-visible p-4" as={Link} href={link}>
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={name}
                    className="w-full aspect-[4/3] object-cover"
                    src={imageUrl}
                    isBlurred
                />
            </CardHeader>
            <CardBody className="p-4 pt-0 text-start flex-col">
                <div className="flex flex-col items-start w-full">
                    <em className="capitalize not-italic font-bold text-xl line-clamp-2 h-14">
                        {name}{" "}
                        {/* <Chip
                            color="success"
                            variant="bordered"
                            className={cn(
                                "rounded-[6px] md:hidden",
                                discountPercent === "100" ? "!hidden" : "flex"
                            )}>
                            {discountPercent}%
                        </Chip> */}
                    </em>
                    {description && (
                        <span className="text-neutral-500 text-sm line-clamp-2">
                            {removeTags(description)}
                        </span>
                    )}
                </div>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== "100" && (
                            <del className="text-default-500 text-sm">
                                {actualPrice}৳
                            </del>
                        )}{" "}
                        <span className="text-xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                </div>
                <CustomDivider />
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-xl"
                        size="sm">
                        <CiBookmark />
                    </Button>
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-xl"
                        size="sm">
                        <CiShoppingCart />
                    </Button>
                    <Chip
                        color="success"
                        variant="bordered"
                        className={"rounded-[6px]"}>
                        {discountPercent}%
                    </Chip>
                </div>
                <div className="w-full">
                    {!disableCompany && (
                        <>
                            <CustomDivider />
                            <User
                                name={seller}
                                avatarProps={{
                                    className: "w-8 h-8",
                                    src: sellerAvatar,
                                }}
                                className="grow-0"
                                as={Link}
                                href={sellerLink}
                            />
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

function CustomDivider() {
    return <Divider className="my-3" />;
}
