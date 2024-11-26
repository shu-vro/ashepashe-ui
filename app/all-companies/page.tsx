import React from "react";
import ViewCompanies from "./components/ViewCompanies";

export interface Company {
    id: number;
    user_id: string;
    name: string;
    category: string | null;
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
    phone: string;
    fb_page: string;
}

export const metadata = {
    title: "Companies",
    description: "All companies",
    keywords: "companies, all companies",
};

export default async function Restaurant() {
    const allCompanies = await getAllCompanies();
    return (
        <div className="my-4">
            <ViewCompanies allCompanies={allCompanies} />
        </div>
    );
}

async function getAllCompanies() {
    const response = await fetch("https://asepashe.com/api/companies");
    const data: Company[] = await response.json();
    return data;
}
