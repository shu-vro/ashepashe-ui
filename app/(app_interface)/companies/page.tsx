import React from "react";
import ViewCompanies from "./components/ViewCompanies";
import { API_URL } from "@/lib/var";

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
    const response = await fetch(`${API_URL}/companies`);
    const data: Company[] = await response.json();
    return data;
}
