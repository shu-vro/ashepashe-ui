import { cn } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CompanySide from "./components/CompanySide";
import CategorySlide from "@/app/(app_interface)/components/CategorySlide";
import ProductSide from "./components/ProductSide";
import { API_URL } from "@/lib/var";
import ReviewSide from "./components/ReviewSide";

type Props = {
    params: Promise<{ productName: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function ProductPage({ params }: Props) {
    const { productName } = await params;
    const productDetails = await getProduct(productName);
    const product = productDetails.product;
    const company = product.company;

    console.log(product);

    const company_full = await getCompanyProducts(company.slug);
    const companyProducts =
        company_full.products as unknown as Product["product"][];
    const reviews = product?.rating;
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
                        className={cn("w-full max-lap:w-[95vw]")}
                    />
                </div>
            )}
            <ReviewSide reviews={reviews} productId={product.id} />
        </div>
    );
}

async function getCompanyProducts(name: string) {
    const response = await fetch(`${API_URL}/company/${name}`);
    const company: Company = await response.json();
    company.products = company.products.map((product) => ({
        ...product,
        company,
    }));
    return company;
}

async function getProduct(name: string) {
    const response = await fetch(`${API_URL}/product/${name}`);
    const data = (await response.json()) as Product;
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

    const response = await fetch(`${API_URL}/product/${productName}`);
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
