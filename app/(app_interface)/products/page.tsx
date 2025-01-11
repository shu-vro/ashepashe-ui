import React from "react";
import ViewProducts from "./components/ViewProducts";
import { Metadata } from "next";
import { API_URL } from "@/lib/var";

export const metadata: Metadata = {
    title: "Advanced Search",
    description: "Search products with advanced search options",
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
