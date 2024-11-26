import ViewCompanies from "@/app/all-companies/components/ViewCompanies";
import React from "react";

export default async function Category(props: {
    params: Promise<{ categoryName: string }>;
}) {
    const { categoryName } = await props.params;

    const categoryCompanies = await getCategoryCompanies(categoryName);
    // console.log(categoryCompanies);

    return (
        <div className="my-4">
            <ViewCompanies allCompanies={categoryCompanies} />
        </div>
    );
}

async function getCategoryCompanies(categoryName: string) {
    const responses = await fetch(`https://asepashe.com/api/companies`);
    const data = await responses.json();
    // console.log(
    //     data
    //         .filter(
    //             ({ category }: { category: string }) =>
    //                 category === categoryName
    //         )
    //         .map(({ name, category }: { name: string; category: string }) => ({
    //             name,
    //             category,
    //         }))
    // );
    return data.filter(
        ({ category }: { category: string }) => category === categoryName
    );
}
