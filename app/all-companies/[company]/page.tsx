import React from "react";
import { Company } from "../page";

export default async function Page(
    props: {
        params: Promise<{ company: string }>;
    }
) {
    const params = await props.params;

    const {
        company
    } = params;

    const companyData = await getCompany(company);
    return <div>{JSON.stringify(companyData)}</div>;
}

async function getCompany(name: string) {
    const response = await fetch(`https://asepashe.com/api/company/${name}`);
    const data: Company = await response.json();
    return data;
}
