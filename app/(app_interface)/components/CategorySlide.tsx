"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { cn, toValidUrl } from "@/lib/utils";

export default function CategorySlide({
    selected,
    disableCompany = true,
    specialized = false,
    ...rest
}: {
    selected: Product["product"][];
    disableCompany?: boolean;
    specialized?: boolean;
} & React.ComponentProps<"div">) {
    return (
        <SwiperWrapper {...rest}>
            {selected.map((select) => {
                const offer = select.offers?.find(
                    (offer) => new Date(offer.validity).getTime() > Date.now()
                );
                return (
                    <SwiperSlide key={select.id} className="w-fit p-4">
                        <ProductCard
                            name={select.name}
                            description={select?.description}
                            // imageUrl={`https://nextui.org/images/fruit-${
                            //     (index % 8) + 1
                            // }.jpeg`}
                            imageUrl={toValidUrl(select.image1!)}
                            discountPrice={
                                !offer
                                    ? select.price
                                    : Math.round(
                                          ((100 - offer.offer_percent) / 100) *
                                              select.price
                                      )
                            }
                            actualPrice={select.price}
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
                            link={`${specialized ? "/p" : "/products"}/${
                                select.slug
                            }`}
                            sellerLink={`${specialized ? "/a" : "/companies"}/${
                                select.company.slug
                            }`}
                            disableCompany={disableCompany}
                        />
                    </SwiperSlide>
                );
            })}
        </SwiperWrapper>
    );
}

export function SwiperWrapper({
    children,
    ...rest
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
    return (
        <div className={cn(rest?.className ? rest.className : "")}>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                slidesPerGroup={2}
                // breakpoints={{
                //     769: {
                //         slidesPerGroup: 2,
                //     },
                // }}
                // mousewheel={true}
                grabCursor={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper !mx-0">
                {children}
            </Swiper>
        </div>
    );
}
