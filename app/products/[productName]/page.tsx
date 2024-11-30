import { Company } from "@/app/all-companies/page";
import { Product } from "@/app/all-products/page";
import { cn } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CompanySide from "./Components/CompanySide";
import CategorySlide from "@/app/components/CategorySlide";
import ProductSide from "./Components/ProductSide";

type Props = {
    params: Promise<{ productName: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function ProductPage({ params }: Props) {
    const { productName } = await params;
    const productDetails = await getProduct(productName);
    const product = productDetails.product;
    const company = product.company;

    const company_full = await getCompanyProducts(company.slug);
    const companyProducts =
        company_full.products as unknown as Product["product"][];
    return (
        <div className="relative grid grid-areas-productLayoutNoLap grid-cols-productLayoutNoLap lap:grid-areas-productLayoutLap lap:grid-cols-productLayoutLap">
            <CompanySide company={company} />
            <ProductSide product={product} />
            {companyProducts.length > 0 && (
                <div className="more-product grid-in-more mt-12">
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

async function getCompanyProducts(name: string) {
    const response = await fetch(`https://asepashe.com/api/company/${name}`);
    const company: Company = await response.json();
    company.products = company.products.map((product) => ({
        ...product,
        company,
    }));

    return company;
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
    // productName = productName.split("-").join(" ");
    // productName = capitalizeFirstLetter(productName);

    const response = await fetch(
        `https://asepashe.com/api/product/${productName}`
    );
    const data: Product = await response.json();

    const product = data.product;
    const company = product.company;

    return {
        title: product.name,
        description: product.description,
        keywords: [
            "product",
            "company",
            "asepashe",
            "bangladesh",
            product.name,
            company.name,
        ],
        openGraph: {
            title: productName,
            description: product.description,
            type: "website",
            url: `https://asepashe.com/products/${productName}`,
            images: {
                url: product.image1!,
                alt: product.name,
            },
            siteName: "AsePashe",
        },
    };
}
