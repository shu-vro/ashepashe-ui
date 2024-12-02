"use client";

import CompanyTile from "@/app/all-companies/components/CompanyTile";
import React, { useState } from "react";
import { Company } from "../page";
import { Pagination } from "@nextui-org/react";
import { dynamicFakeImageGenerator, paginate, toValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function inBound(page: number, upperBound: number) {
    if (page < 1) {
        return 1;
    }
    if (page > upperBound) {
        return upperBound;
    }
    return page;
}

export default function ViewCompanies({
    allCompanies,
    initialPage,
}: {
    allCompanies: Company[];
    initialPage: number;
}) {
    const [currentPage, setCurrentPage] = useState(
        inBound(initialPage, Math.ceil(allCompanies.length / 12))
    );
    const selectedCompanies = paginate(allCompanies, currentPage, 12);
    const router = useRouter();

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-sm:grid-cols-2 gap-4 p-4 place-items-center">
                {selectedCompanies.map((company, index) => (
                    <CompanyTile
                        key={index}
                        name={company.name}
                        slug={company.slug}
                        where={company.city}
                        description={company.description}
                        imageUrl={toValidUrl(company.image)}
                        // imageUrl={dynamicFakeImageGenerator()}
                    />
                ))}
            </div>
            <div className="w-full">
                <Pagination
                    showControls
                    isCompact
                    total={Math.ceil(allCompanies.length / 12)}
                    page={currentPage}
                    onChange={(value) => {
                        setCurrentPage(value);
                        window.scrollTo(0, 0);
                        router.push(`?page=${value}`);
                    }}
                    className="mx-auto w-fit"
                />
            </div>
        </>
    );
}
