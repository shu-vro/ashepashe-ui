import React from "react";
import { Company } from "../page";

export default async function Page({
    params: { company },
}: {
    params: { company: string };
}) {
    const companyData = await getCompany(company);
    return <div>{JSON.stringify(companyData)}</div>;
}

async function getCompany(name: string) {
    const response = await fetch(`https://asepashe.com/api/company/${name}`);
    const data: Company = await response.json();
    return data;
}
