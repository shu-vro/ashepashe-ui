"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Mousewheel } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Product } from "../all-products/page";
import Link from "next/link";

export default function CategorySlide({
    selected,
    companyName,
    companyImage,
    companySlug,
    ...rest
}: {
    selected: Product["product"][];
    companyName: string;
    companyImage: string;
    companySlug: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <SwiperWrapper {...rest}>
            {selected.map((select, index) => (
                <SwiperSlide key={select.id} className="w-fit p-4">
                    <ProductCard
                        name={select.name}
                        imageUrl={`https://nextui.org/images/fruit-${
                            (index % 8) + 1
                        }.jpeg`}
                        discountPrice={select.price}
                        actualPrice={500}
                        // rating={4.52}
                        seller={companyName}
                        // sellerAvatar={companyImage}
                        sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        className="min-h-[370px]"
                        as={Link}
                        // @ts-ignore
                        href={`/products/${select.slug}`}
                        disableCompany={true}
                    />
                </SwiperSlide>
            ))}
        </SwiperWrapper>
    );
}

export function SwiperWrapper({
    children,
    ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    const { isMobile } = useSidebar();
    return (
        <div
            className={cn(
                {
                    "w-[calc(100vw-16rem)]": !isMobile,
                },
                rest?.className ? rest.className : ""
            )}>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                mousewheel={true}
                grabCursor={true}
                navigation={true}
                modules={[Navigation, Mousewheel]}
                className="mySwiper !mx-0">
                {children}
            </Swiper>
        </div>
    );
}
