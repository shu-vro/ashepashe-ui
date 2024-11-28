"use client";

import React from "react";
import { SwiperWrapper } from "./CategorySlide";
import { Company } from "../all-companies/page";
import { SwiperSlide } from "swiper/react";
import CompanyTile from "../all-companies/components/CompanyTile";
import { dynamicFakeImageGenerator } from "@/lib/utils";

export default function CompanySlide({ companies }: { companies: Company[] }) {
    return (
        <SwiperWrapper>
            {companies.map((company) => (
                <SwiperSlide key={company.id} className="w-fit p-4">
                    <CompanyTile
                        name={company.name}
                        description={company.description}
                        where={company.city}
                        slug={company.slug}
                        // imageUrl={company.image}
                        imageUrl={dynamicFakeImageGenerator()}
                        className="w-80"
                    />
                </SwiperSlide>
            ))}
        </SwiperWrapper>
    );
}
