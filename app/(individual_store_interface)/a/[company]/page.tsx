import React from "react";
import { cn, removeTags } from "@/lib/utils";
import CompanyBanner from "@/app/(app_interface)/companies/[company]/CompanyBanner";
import CompanyCard from "@/app/(app_interface)/companies/[company]/CompanyCard";
import { Metadata, ResolvingMetadata } from "next";
import CategorySlide from "@/app/(app_interface)/components/CategorySlide";
import { API_URL } from "@/lib/var";
import { groupBy } from "lodash";

export default async function Page(props: Props) {
    const params = await props.params;

    const { company: company_id } = params;

    const { company, sections } = await getCompany(company_id);
    if (!company) return <div>Company not found</div>;

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
                        let section = sections.find(
                            (section) => section.id === Number(key)
                        );
                        if (!value) return null;
                        if (!section) {
                            section = {
                                id: Math.random(),
                                name: "Others",
                            } as Category;
                        }
                        return (
                            <div
                                key={section.id}
                                className="more-product grid-in-more mt-6">
                                <h2 className="text-2xl font-bold text-default-400 ml-4 w-fit">
                                    {section.name} ({value.length})
                                </h2>
                                <CategorySlide
                                    specialized
                                    selected={value}
                                    className={cn(
                                        "w-full max-lap:w-[95vw] max-[760px]:w-[95vw]"
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
    try {
        const response = await fetch(`${API_URL}/company/${name}`);
        const company: Company = await response.json();
        if (!Object.keys(company).length) throw new Error("Company not found");
        const response2 = await fetch(
            `${API_URL}/company-sections/${company.id}`
        );
        const sections: Category[] = (await response2.json()).sections;
        return { company, sections };
    } catch (error) {
        return { company: null, sections: null };
    }
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
        keywords: [company.map, "menu", "products", "store"],

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
            siteName: "AAmarStore",
            releaseDate: company.created_at,
        },
    };
}
