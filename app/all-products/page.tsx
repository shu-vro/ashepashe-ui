import React from "react";
import ViewProducts from "./components/ViewProducts";
import { Metadata } from "next";

export interface Product {
    id: number;
    company_id: string;
    name: string;
    description: string;
    price: number;
    image1: string;
    image2: string | null;
    image3: string | null;
    created_at: string;
    updated_at: string;
    slug: string;
    section_id: number;
}

export const metadata: Metadata = {
    title: "All Products",
    description: "All products",
    keywords: "products, all products",
};

export default async function AllProducts({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { page } = await searchParams;
    const allCompanies = await getAllProducts();
    return (
        <div className="my-4">
            <ViewProducts
                allProducts={allCompanies}
                initialPage={parseInt(page || "1")}
            />
        </div>
    );
}

async function getAllProducts() {
    const response = await fetch("https://asepashe.com/api/products");
    const data: Product[] = await response.json();
    return data;
}
