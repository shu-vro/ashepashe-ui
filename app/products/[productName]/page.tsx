import { Company } from "@/app/all-companies/page";
import { Product } from "@/app/all-products/page";
import { capitalizeFirstLetter, cn, first_n } from "@/lib/utils";
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
    const { company, companyProducts } = await getCompany(
        productDetails.company_id.split(" ").join("-")
    );
    return (
        <div className="grid grid-areas-productLayoutNoLap grid-cols-productLayoutNoLap lap:grid-areas-productLayoutLap lap:grid-cols-productLayoutLap">
            <CompanySide company={company} />
            <ProductSide product={productDetails} />
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

    const response = await fetch(
        `https://asepashe.com/api/product/${productName}`
    );
    const data: Product = await response.json();

    return {
        title: productName,
        description: data.description,
        keywords: [
            "product",
            "company",
            "asepashe",
            "bangladesh",
            productName,
            data.company_id,
        ],
        openGraph: {
            title: productName,
            description: data.description,
            type: "website",
            url: `https://asepashe.com/products/${productName}`,
            images: {
                url: data.image1,
                alt: productName,
            },
            siteName: "AsePashe",
        },
    };
}
