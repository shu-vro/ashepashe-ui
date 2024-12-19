import React from "react";
import { cn, removeTags } from "@/lib/utils";
import CompanyBanner from "./CompanyBanner";
import CompanyCard from "./CompanyCard";
import { Metadata, ResolvingMetadata } from "next";
import CategorySlide from "@/app/components/CategorySlide";
import { API_URL } from "@/lib/var";
import { groupBy } from "lodash";

export default async function Page(props: Props) {
    const params = await props.params;

    const { company: company_id } = params;

    const { company, sections } = await getCompany(company_id);
    let companyProducts = company.products as unknown as Product["product"][];
    companyProducts = companyProducts.map((product) => ({
        ...product,
        company,
    }));

    const group = groupBy(companyProducts, (item) => item.section_id);
    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap gap-4">
            <CompanyBanner src={company.image} alt={company?.name} />
            <CompanyCard company={company} />
            <div className="grid-in-name text-center">
                <h2 className="text-5xl font-bold my-3">{company.name}</h2>
                <p className="italic text-neutral-500 w-7/12 mx-auto">
                    {removeTags(company.description)}
                </p>
            </div>
            {companyProducts.length > 0 && (
                <div className="grid-in-product">
                    {Object.entries(group).map(([key, value]) => {
                        const section = sections.find(
                            (section) => section.id === Number(key)
                        );
                        if (!section || !value) return null;
                        return (
                            <div
                                key={section.id}
                                className="more-product grid-in-more mt-6">
                                <h2 className="text-2xl font-bold text-default-400 ml-4">
                                    {section.name} ({value.length})
                                </h2>
                                <CategorySlide
                                    selected={value}
                                    className={cn(
                                        "w-full max-lap:w-screen max-[760px]:w-[100vw]"
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

async function getCompany(name: string) {
    const response = await fetch(`${API_URL}/company/${name}`);
    const company: Company = await response.json();
    const response2 = await fetch(`${API_URL}/sections`);
    const sections: Category[] = await response2.json();
    return { company, sections };
}

type Props = {
    params: Promise<{ company: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const companyName = (await params).company;
    const response = await fetch(`${API_URL}/company/${companyName}`);
    const company: Company = await response.json();

    // fetch data
    // const product = await fetch(`https://.../${categoryName}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        title: company.name,
        description: company.description,

        openGraph: {
            url: `https://asepashe.com/all-companies/${company.slug}`,
            title: company.name,
            description: company.description,
            images: [
                {
                    url: company.image,
                    alt: company.name,
                },
            ],
            siteName: "AsePashe",
            releaseDate: company.created_at,
        },
    };
}
