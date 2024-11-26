import React from "react";
import ViewProducts from "./components/ViewProducts";

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

export default async function AllProducts() {
    const allCompanies = await getAllProducts();
    return (
        <div className="my-4">
            <ViewProducts allProducts={allCompanies} />
        </div>
    );
}

async function getAllProducts() {
    const response = await fetch("https://asepashe.com/api/products");
    const data: Product[] = await response.json();
    return data;
}
