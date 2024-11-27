import React from "react";
import { Company } from "../page";
import { Product } from "@/app/all-products/page";
import CategorySlide from "@/app/components/CategorySlide";
import { cn } from "@/lib/utils";
import CompanyBanner from "./CompanyBanner";
import CompanyCard from "./CompanyCard";

export default async function Page(props: {
    params: Promise<{ company: string }>;
}) {
    const params = await props.params;

    const { company: company_id } = params;

    const { company, companyProducts } = await getCompany(company_id);
    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap">
            <CompanyBanner
                src={company.image}
                name={company.name}
                description={company.description}
            />
            <CompanyCard company={company} />
            {companyProducts.length > 0 && (
                <div className="grid-in-products mt-12">
                    <h2 className="text-2xl font-bold text-default-400 ml-4">
                        More from {company.name}
                    </h2>
                    <CategorySlide
                        selected={companyProducts}
                        className={cn(
                            "w-full max-lap:w-[calc(100vw-16rem)] max-[760px]:w-[100vw]"
                        )}
                    />
                </div>
            )}
        </div>
    );
}

async function getCompany(name: string) {
    const response = await fetch(`https://asepashe.com/api/company/${name}`);
    const company: Company = await response.json();

    const response2 = await fetch("https://asepashe.com/api/products");
    const products: Product[] = await response2.json();

    const companyProducts = products.filter(
        (product) => product.company_id === company.name
    );
    return { company, companyProducts };
}
