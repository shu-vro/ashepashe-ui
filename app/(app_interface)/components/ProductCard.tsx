"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardProps,
    Chip,
    Divider,
    Image,
    User,
} from "@heroui/react";
import React, { use, useMemo, useState } from "react";
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
import { CartContext } from "@/contexts/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Rating } from "@smastrom/react-rating";

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
    const [isOpen, onOpenChange] = useState(false);
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

    const link = `${specialized ? `/${product.company.slug}` : "/products"}/${
        product.slug
    }`;
    return (
        <>
            <Card
                shadow="sm"
                // isPressable
                {...rest}
                as={"div"}
                className={cn(
                    "w-52 md:w-64 p-0 overflow-visible cursor-pointer",
                    rest?.className || ""
                )}>
                <CardBody
                    className="overflow-visible relative"
                    onClick={() => {
                        onOpenChange(true);
                    }}
                    // as={Link}
                    // href={"#"}
                    // onClick={(e) => {
                    //     e.stopPropagation();
                    //     push(link);
                    // }}
                >
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
                        <p className="capitalize not-italic font-bold text-xl line-clamp-2 h-[4ch]">
                            {product.name}{" "}
                        </p>
                        <p className="text-neutral-500 text-sm line-clamp-2 h-[4ch]">
                            {product.description &&
                                removeTags(product.description)}
                        </p>
                    </div>
                    <CustomDivider />
                    <div className="flex flex-row justify-between items-center md:gap-1 w-full">
                        <div className="flex flex-row items-center gap-1">
                            <div>
                                {discountPercent !== 0 && (
                                    <del className="text-default-500 text-sm">
                                        {product.price}৳
                                    </del>
                                )}{" "}
                                <span className="text-2xl font-bold">
                                    {discountPrice + "৳"}
                                </span>
                            </div>
                            <Button
                                isIconOnly
                                variant="light"
                                color="success"
                                className="text-xl"
                                onPress={() => {
                                    useCart!.addToCart(product, 1);
                                }}>
                                <CiShoppingCart />
                            </Button>
                        </div>
                        <Chip
                            startContent={<FaStar />}
                            size="sm"
                            variant="bordered"
                            radius="sm"
                            color="warning">
                            {(rating || 0)?.toFixed(1)}
                        </Chip>
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
                                    href={`${
                                        specialized ? "/a" : "/companies"
                                    }/${product.company.slug}`}
                                />
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
            <Drawer open={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-3xl">
                        <DrawerHeader>
                            <DrawerTitle>Product Details</DrawerTitle>
                            <DrawerDescription className="sr-only">
                                Product Description
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0 overflow-y-auto max-h-[50vh]">
                            <Swiper
                                navigation={true}
                                modules={[Navigation]}
                                freeMode
                                centeredSlides>
                                {Array(3)
                                    .fill(1)
                                    .map((_, i) => (
                                        <SwiperSlide key={i}>
                                            <Image
                                                className="w-[600px] max-w-full"
                                                src={
                                                    product.image1 || undefined
                                                }
                                                alt={product.name}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                            <h1 className="text-3xl">{product.name}</h1>
                            <p className="text-muted-foreground/80">
                                {product.description &&
                                    removeTags(product.description)}
                            </p>
                            <CustomDivider />
                            <div className="flex flex-row justify-between items-center">
                                <Rating
                                    value={rating || 0}
                                    readOnly
                                    className="max-w-36"
                                />
                                <div>
                                    Rated by {product.rating?.length} users
                                </div>
                            </div>
                            <CustomDivider />
                            <User
                                name={product.company.name}
                                avatarProps={{
                                    className: "w-16 h-16",
                                    src: product.company.image,
                                    ImgComponent: Image,
                                    imgProps: {
                                        width: 64,
                                        height: 64,
                                    },
                                    radius: "sm",
                                }}
                                as={Link}
                                href={`${specialized ? "/a" : "/companies"}/${
                                    product.company.slug
                                }`}
                                description={product.company.description}
                                classNames={{
                                    name: "text-xl",
                                    description: "text-muted-foreground",
                                }}
                            />
                            <CustomDivider />
                            <Button
                                color="primary"
                                className="font-bold"
                                fullWidth
                                as={Link}
                                href={link}>
                                View Details
                            </Button>
                        </div>
                        <DrawerFooter>
                            <div className="flex flex-row gap-2">
                                <DrawerClose asChild>
                                    <Button>Close</Button>
                                </DrawerClose>
                            </div>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

function CustomDivider() {
    return <Divider className="my-3 max-mob:my-1" />;
}
