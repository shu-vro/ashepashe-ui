import React from "react";
import ViewProducts from "./components/ViewProducts";
import { Metadata } from "next";
import { Company } from "../companies/page";
import { API_URL } from "@/lib/var";

export interface Product {
    product: {
        id: number;
        company_id: number;
        name: string;
        description: string;
        price: number;
        image1: string | null;
        image2: string | null;
        image3: string | null;
        created_at: string;
        updated_at: string;
        slug: string;
        section_id: number;
        company: Company;
    };
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
    const allProducts = await getAllProducts();
    return (
        <div className="my-4">
            <ViewProducts
                allProducts={allProducts}
                initialPage={parseInt(page || "1")}
            />
        </div>
    );
}

async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    const data: Product["product"][] = await response.json();
    return data;
}
