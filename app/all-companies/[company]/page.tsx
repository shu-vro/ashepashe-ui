import React from "react";
import { Company } from "../page";
import { Product } from "@/app/all-products/page";
import { cn, removeTags } from "@/lib/utils";
import CompanyBanner from "./CompanyBanner";
import CompanyCard from "./CompanyCard";
import { Metadata, ResolvingMetadata } from "next";
import CategorySlide from "@/app/components/CategorySlide";

export interface Category {
    id: number;
    name: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

export default async function Page(props: Props) {
    const params = await props.params;

    const { company: company_id } = params;

    const { company, sections } = await getCompany(company_id);
    const companyProducts = company.products as unknown as Product["product"][];

    const group = Object.groupBy(companyProducts, (item) => item.section_id);
    console.log(group);
    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap gap-4">
            <CompanyBanner src={company.image} />
            <CompanyCard company={company} />
            <div className="grid-in-name text-center">
                <h2 className="text-5xl font-bold my-3">{company.name}</h2>
                <p className="italic text-neutral-500 w-7/12 mx-auto">
                    {removeTags(company.description)}
                </p>
            </div>
            {companyProducts.length > 0 && (
                <div className="grid-in-product mt-12">
                    <h2 className="text-2xl font-bold text-default-400 ml-4">
                        More from {company.name}
                    </h2>
                    <CategorySlide
                        selected={companyProducts}
                        companyName={company.name}
                        companyImage={company.image}
                        companySlug={company.slug}
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
    const response2 = await fetch(`https://asepashe.com/api/sections`);
    const sections: Category[] = await response2.json();
    return { company, sections };
}

type Props = {
    params: Promise<{ company: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const companyName = (await params).company;
    const response = await fetch(
        `https://asepashe.com/api/company/${companyName}`
    );
    const company: Company = await response.json();

    // fetch data
    // const product = await fetch(`https://.../${categoryName}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        title: company.name,
        description: company.description,

        openGraph: {
            url: `https://asepashe.com/all-companies/${company.slug}`,
            title: company.name,
            description: company.description,
            images: [
                {
                    url: company.image,
                    alt: company.name,
                },
            ],
            siteName: "AsePashe",
            releaseDate: company.created_at,
        },
    };
}
