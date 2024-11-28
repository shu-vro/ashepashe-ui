import React from "react";
import ViewCompanies from "./components/ViewCompanies";
import { Product } from "../all-products/page";

export interface Company {
    id: number;
    user_id: string;
    name: string;
    category: string;
    description: string;
    division: string;
    city: string;
    image: string;
    iframe: string;
    map: string;
    created_at: string;
    updated_at: string;
    slug: string;
    status: number;
    phone: string | null;
    fb_page: string | null;
    products: Product[];
}

export const metadata = {
    title: "All Companies",
    description: "All companies",
    keywords: "companies, all companies",
};

export default async function Restaurant({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { page } = await searchParams;
    const allCompanies = await getAllCompanies();
    return (
        <div className="my-4">
            <ViewCompanies
                allCompanies={allCompanies}
                initialPage={parseInt(page || "1")}
            />
        </div>
    );
}

async function getAllCompanies() {
    const response = await fetch("https://asepashe.com/api/companies");
    const data: Company[] = await response.json();
    return data;
}
