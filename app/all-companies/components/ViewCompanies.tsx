"use client";

import CompanyTile from "@/app/all-companies/components/CompanyTile";
import React, { useState } from "react";
import { Company } from "../page";
import { Pagination } from "@nextui-org/react";
import { paginate } from "@/lib/utils";

export default function ViewCompanies({
    allCompanies,
}: {
    allCompanies: Company[];
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const selectedCompanies = paginate(allCompanies, currentPage, 12);

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 p-4 place-items-center">
                {selectedCompanies.map((company, index) => (
                    <CompanyTile
                        key={index}
                        name={company.name}
                        where={company.city}
                        description={company.description}
                        // imageUrl={company.image}
                        imageUrl={`https://nextui.org/images/fruit-${
                            Math.floor(Math.random() * 7) + 1
                        }.jpeg`}
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
                    }}
                    className="mx-auto w-fit"
                />
            </div>
        </>
    );
}
