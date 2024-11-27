import React from "react";
import { Company } from "../page";
import { Product } from "@/app/all-products/page";
import CategorySlide from "@/app/components/CategorySlide";
import { cn, removeTags } from "@/lib/utils";
import CompanyBanner from "./CompanyBanner";
import CompanyCard from "./CompanyCard";
import ViewProducts from "@/app/all-products/components/ViewProducts";
import { Metadata, ResolvingMetadata } from "next";

export default async function Page(props: Props) {
    const params = await props.params;

    const { company: company_id } = params;

    const { company, companyProducts } = await getCompany(company_id);
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
                    <ViewProducts
                        allProducts={companyProducts}
                        initialPage={1}
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
