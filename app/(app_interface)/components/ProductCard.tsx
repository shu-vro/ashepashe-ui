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
} from "@heroui/react";
import React, { use, useMemo } from "react";
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
import Ribbon from "./Ribbon";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CartContext } from "@/contexts/CartContext";

interface ProductCardProps {
    disableCompany?: boolean;
    specialized?: boolean;
    product: Product["product"];
}

export function ProductCard({
    product,
    disableCompany = false,
    specialized = false,
    ...rest
}: ProductCardProps & CardProps) {
    const { push } = useRouter();
    const useCart = use(CartContext);
    const { discountPercent, discountPrice } = useMemo(() => {
        const offer = product.offers?.find(
            (offer) => new Date(offer.validity).getTime() > Date.now()
        );
        const discountPrice = !offer
            ? product.price
            : ((100 - offer.offer_percent) / 100) * product.price;

        const discountPercent = 100 - (discountPrice / product.price) * 100;
        return { discountPercent, discountPrice: Math.round(discountPrice) };
    }, [product.offers, product.price]);

    const rating = useMemo(() => {
        return product.rating
            ? product.rating.reduce((a, b) => a + b.rating, 0) /
                  product.rating.length
            : 0;
    }, [product.rating]);

    const link = `${specialized ? "/p" : "/products"}/${product.slug}`;
    return (
        <Card
            shadow="sm"
            // isPressable
            {...rest}
            as={"div"}
            className={cn(
                "w-52 md:w-64 p-0 overflow-visible",
                rest?.className || ""
            )}>
            <CardBody
                className="overflow-visible relative"
                as={Link}
                href={link}
                onClick={(e) => {
                    e.stopPropagation();
                    push(link);
                }}>
                {discountPercent !== 0 && (
                    <Ribbon>{discountPercent.toFixed(0)}% off</Ribbon>
                )}
                <Image
                    shadow="none"
                    radius="lg"
                    isZoomed
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover !h-auto"
                    src={toValidUrl(product.image1!)}
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
                        {product.name}{" "}
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
                        {product.description && removeTags(product.description)}
                    </Link>
                </div>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== 0 && (
                            <del className="text-default-500 text-sm">
                                {product.price}৳
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
                    {/* <Button isIconOnly variant="light" className="text-xl">
                        <CiBookmark />
                    </Button> */}
                    <Button
                        isIconOnly
                        variant="light"
                        className="text-xl"
                        onPress={() => {
                            useCart!.addToCart(product, 1);
                        }}>
                        <CiShoppingCart />
                    </Button>
                </div>
                <div className="w-full">
                    {!disableCompany && (
                        <>
                            <CustomDivider />
                            <User
                                name={product.company.name}
                                avatarProps={{
                                    className: "w-8 h-8 grow",
                                    src: product.company.image,
                                    ImgComponent: Image,
                                    imgProps: {
                                        width: 32,
                                        height: 32,
                                    },
                                }}
                                className="grow-0"
                                as={Link}
                                href={`${specialized ? "/a" : "/companies"}/${
                                    product.company.slug
                                }`}
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
