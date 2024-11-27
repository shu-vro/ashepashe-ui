import { Company } from "@/app/all-companies/page";
import { Product } from "@/app/all-products/page";
import { capitalizeFirstLetter, first_n } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CompanySide from "./Components/CompanySide";

type Props = {
    params: Promise<{ productName: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function ProductPage({ params }: Props) {
    const { productName } = await params;
    const productDetails = await getProduct(productName);
    const { company, companyProducts } = await getCompany(
        productDetails.company_id.split(" ").join("-")
    );
    return (
        <>
            <div className="grid w-full grid-areas-productLayoutNoLap grid-cols-productLayoutNoLap lap:grid-areas-productLayoutLap lap:grid-cols-productLayoutLap">
                <CompanySide company={company} />
                <div className="product bg-green-500 grid-in-product"></div>
                <div className="more-product bg-blue-500 grid-in-more"></div>
            </div>
            <div className="whitespace-pre break-words">
                {JSON.stringify(productDetails, null, 4)}
                {JSON.stringify(company, null, 4)}
                {JSON.stringify(companyProducts, null, 4)}
            </div>
        </>
    );
}

async function getCompany(name: string) {
    const response = await fetch(`https://asepashe.com/api/company/${name}`);
    const company: Company = await response.json();

    const response2 = await fetch("https://asepashe.com/api/products");
    const products: Product[] = await response2.json();

    let companyProducts = products.filter(
        (product) => product.company_id === company.name
    );
    companyProducts = first_n(companyProducts, 8);
    return { company, companyProducts };
}

async function getProduct(name: string): Promise<Product> {
    const response = await fetch(`https://asepashe.com/api/product/${name}`);
    const data = await response.json();
    return data;
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    let productName = (await params).productName;
    productName = productName.split("-").join(" ");
    productName = capitalizeFirstLetter(productName);

    return {
        title: productName,
        description: `${productName}`,
    };
}
