import ViewCompanies from "@/app/(app_interface)/companies/components/ViewCompanies";
import { API_URL } from "@/lib/var";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export default async function Category(props: Props) {
    const { categoryName } = await props.params;
    const { page } = await props.searchParams;

    const categoryCompanies = await getCategoryCompanies(categoryName);
    // console.log(categoryCompanies);

    return (
        <div className="my-4">
            <ViewCompanies
                allCompanies={categoryCompanies}
                initialPage={parseInt(page as string) || 1}
            />
        </div>
    );
}

type Props = {
    params: Promise<{ categoryName: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const categoryName = (await params).categoryName;

    // fetch data
    // const product = await fetch(`https://.../${categoryName}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        title: categoryName,
        description: `Companies tagged in ${categoryName}`,
    };
}

async function getCategoryCompanies(categoryName: string) {
    const responses = await fetch(`${API_URL}/companies`);
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
