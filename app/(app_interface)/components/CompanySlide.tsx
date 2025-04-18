"use client";

import React from "react";
import { SwiperWrapper } from "./CategorySlide";
import { SwiperSlide } from "swiper/react";
import CompanyTile from "../companies/components/CompanyTile";
import { dynamicFakeImageGenerator, toValidUrl } from "@/lib/utils";

export default function CompanySlide({ companies }: { companies: Company[] }) {
    return (
        <SwiperWrapper>
            {companies.map((company) => (
                <SwiperSlide key={company.id} className="p-4 mini-slide">
                    <CompanyTile
                        name={company.name}
                        description={company.description}
                        where={company.city}
                        slug={company.slug}
                        imageUrl={toValidUrl(company.image)}
                        // imageUrl={dynamicFakeImageGenerator()}
                        className="w-52 md:w-64"
                    />
                </SwiperSlide>
            ))}
        </SwiperWrapper>
    );
}
