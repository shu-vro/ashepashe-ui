"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Mousewheel } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { cn, toValidUrl } from "@/lib/utils";

export default function CategorySlide({
    selected,
    disableCompany = true,
    ...rest
}: {
    selected: Product["product"][];
    disableCompany?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <SwiperWrapper {...rest}>
            {selected.map((select, index) => (
                <SwiperSlide key={select.id} className="w-fit p-4">
                    <ProductCard
                        name={select.name}
                        // imageUrl={`https://nextui.org/images/fruit-${
                        //     (index % 8) + 1
                        // }.jpeg`}
                        imageUrl={toValidUrl(select.image1!)}
                        discountPrice={select.price}
                        actualPrice={500}
                        rating={
                            select.rating
                                ? select.rating.reduce(
                                      (a, b) => a + b.rating,
                                      0
                                  ) / select.rating.length
                                : 0
                        }
                        seller={select.company.name}
                        sellerAvatar={toValidUrl(select.company.image)}
                        // sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        // className="min-h-[370px]"
                        link={`/products/${select.slug}`}
                        sellerLink={`/companies/${select.company.slug}`}
                        disableCompany={disableCompany}
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
    return (
        <div className={cn(rest?.className ? rest.className : "")}>
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
