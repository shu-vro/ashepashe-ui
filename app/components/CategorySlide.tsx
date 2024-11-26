"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Mousewheel } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function CategorySlide() {
    const { isMobile } = useSidebar();
    return (
        <div
            className={cn({
                "w-[calc(100vw-16rem)]": !isMobile,
            })}>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                mousewheel={true}
                grabCursor={true}
                navigation={true}
                modules={[Navigation, Mousewheel]}
                className="mySwiper !mx-0">
                {[...Array(8)].map((_, index) => (
                    <SwiperSlide key={index} className="w-fit p-4">
                        <ProductCard
                            name="Apple Watch Series 7 Space Gray"
                            url={`https://nextui.org/images/fruit-${
                                (index % 8) + 1
                            }.jpeg`}
                            discountPrice={200}
                            actualPrice={250}
                            rating={4.52}
                            seller={"John Doe"}
                            sellerAvatar="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
