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
import { FaStar } from "react-icons/fa6";
import "@smastrom/react-rating/style.css";
import {
    cn,
    dynamicFakeImageGenerator,
    removeTags,
    toValidUrl,
} from "@/lib/utils";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    name: string;
    actualPrice: number;
    discountPrice: number;
    seller: string;
    sellerAvatar: string;
    rating: number;
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
    rating,
    description,
    link,
    disableCompany = false,
    sellerLink = "#",
    ...rest
}: ProductCardProps & CardProps) {
    const { push } = useRouter();
    const discountPercent = 100 - (discountPrice / actualPrice) * 100;
    return (
        <Card
            shadow="sm"
            // isPressable
            {...rest}
            as={"div"}
            className={cn("w-52 md:w-64 p-0", rest?.className || "")}>
            <CardBody
                className="overflow-visible relative"
                as={Link}
                href={link}
                onClick={(e) => {
                    e.stopPropagation();
                    push(link);
                }}>
                <Image
                    shadow="none"
                    radius="lg"
                    isZoomed
                    alt={name}
                    className="w-full aspect-[4/3] object-cover !h-auto"
                    src={toValidUrl(imageUrl)}
                    isBlurred
                    width={400}
                    height={300}
                    as={NextImage}
                    fallbackSrc={dynamicFakeImageGenerator()}
                />
            </CardBody>
            <CardFooter className="pt-0 text-start flex-col">
                <div className="flex flex-col items-start w-full">
                    <Link
                        href={link}
                        onClick={(e) => e.stopPropagation()}
                        className="capitalize not-italic font-bold text-xl line-clamp-2 h-[4ch]">
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
                    </Link>
                    <Link
                        href={link}
                        className="text-neutral-500 text-sm line-clamp-2 h-[4ch]">
                        {description && removeTags(description)}
                    </Link>
                </div>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== 0 && (
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
                <div className="flex flex-row justify-between items-center md:gap-1 w-full">
                    <Chip
                        startContent={<FaStar />}
                        size="sm"
                        variant="bordered"
                        radius="sm"
                        color="warning">
                        {(rating || 0)?.toFixed(1)}
                    </Chip>
                    <Button isIconOnly variant="light" className="text-xl">
                        <CiBookmark />
                    </Button>
                    <Button isIconOnly variant="light" className="text-xl">
                        <CiShoppingCart />
                    </Button>
                    {discountPercent !== 0 && (
                        <Chip
                            color="success"
                            variant="bordered"
                            radius="sm"
                            size="sm">
                            {discountPercent.toFixed(0)}%
                        </Chip>
                    )}
                </div>
                <div className="w-full">
                    {!disableCompany && (
                        <>
                            <CustomDivider />
                            <User
                                name={seller}
                                avatarProps={{
                                    className: "w-8 h-8 grow",
                                    src: sellerAvatar,
                                }}
                                className="grow-0"
                                as={Link}
                                href={sellerLink}
                            />
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

function CustomDivider() {
    return <Divider className="my-3 max-mob:my-1" />;
}
