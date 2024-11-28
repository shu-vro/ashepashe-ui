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
    disableCompany = false,
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
            <CardFooter className="p-4 pt-0 text-start flex-col">
                <div className="flex flex-col items-start w-full">
                    <em className="capitalize not-italic font-bold text-xl line-clamp-2 h-16">
                        {name}{" "}
                        <Chip
                            color="success"
                            variant="bordered"
                            className={cn(
                                "rounded-[6px] md:hidden",
                                discountPercent === "100" ? "!hidden" : "flex"
                            )}>
                            {discountPercent}%
                        </Chip>
                    </em>
                    {description && (
                        <span className="text-neutral-500 text-sm line-clamp-2">
                            {removeTags(description)}
                        </span>
                    )}
                </div>
                <Divider className="my-4" />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== "100" && (
                            <del className="text-default-500">
                                {actualPrice}৳
                            </del>
                        )}{" "}
                        <span className="text-2xl font-bold">
                            {discountPrice + "৳"}
                        </span>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                </div>
                <Divider className="my-4" />
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                    {!disableCompany && (
                        <>
                            <User
                                name={seller}
                                avatarProps={{
                                    className: "w-8 h-8",
                                    src: sellerAvatar,
                                }}
                                className="grow-0"
                            />
                            <div className="grow" />
                        </>
                    )}
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
                        className={cn(
                            "rounded-[6px]",
                            discountPercent === "100"
                                ? "hidden"
                                : "hidden md:flex"
                        )}>
                        {discountPercent}%
                    </Chip>
                </div>
            </CardFooter>
        </Card>
    );
}

export function BigCard({}) {
    return (
        <Card isPressable as={"div"} shadow="none">
            <CardHeader className="p-6 overflow-visible">
                <Image
                    isBlurred
                    src="https://nextui.org/images/fruit-1.jpeg"
                    alt="name"
                    shadow="sm"
                    className="w-full aspect-[4/3] object-cover"
                    removeWrapper
                />
            </CardHeader>
            <CardBody className="p-6 flex-row justify-between">
                <div>
                    <h2 className="font-bold text-3xl">Best Discounts</h2>
                    <span className="text-neutral-500">1234 items</span>
                </div>
                <div>
                    <span className="text-neutral-500">Left</span>
                    <Chip
                        color="warning"
                        variant="bordered"
                        className="rounded-[6px] block">
                        10 days
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
}

export function SideCard({}: {}) {
    const actualPrice = 200;
    const discountPrice = 50;
    const name = "Apple Watch Series 7 Space Gray";
    // const seller = "John Doe";
    // const sellerAvatar = "https://i.pravatar.cc/150?u=a04258114e29026702d";
    return (
        <Card isPressable as={"div"} shadow="sm">
            <CardBody className="p-3 flex-row justify-start gap-4">
                <div className="overflow-visible">
                    <Image
                        isBlurred
                        isZoomed
                        src="https://nextui.org/images/fruit-1.jpeg"
                        alt={name}
                        className="w-full h-full aspect-square object-cover"
                        classNames={{
                            wrapper: "w-24 h-24",
                        }}
                    />
                </div>
                <div className="my-auto">
                    <h2 className="font-bold text-xl">{name}</h2>
                    <div>
                        <del className="text-default-500">{actualPrice}৳</del>{" "}
                        <span className="font-bold">{discountPrice + "৳"}</span>
                    </div>
                    <Chip
                        color="warning"
                        variant="bordered"
                        size="sm"
                        className="rounded-[6px] block">
                        10 days
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
}
