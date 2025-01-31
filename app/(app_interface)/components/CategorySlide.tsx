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
                    <SwiperSlide key={select.id} className="mini-slide p-4">
                        <ProductCard
                            product={select}
                            disableCompany={disableCompany}
                            specialized={specialized}
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
