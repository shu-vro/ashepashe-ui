import React, { use, useEffect, useMemo, useState } from "react";
import CategoryEditSection from "./CategoryEditSection";
import { API_URL } from "@/lib/var";
import { UserContext } from "@/contexts/UserContext";

export interface CompanySection extends Category {
    products: Product["product"][];
}

export default function AllCategories({
    products,
}: {
    products: Product["product"][];
}) {
    const useUser = use(UserContext);

    if (!useUser) return null;
    const { companySections } = useUser;

    if (!companySections || !companySections.length) return null;

    const sectionsWithProducts = useMemo(() => {
        const sectionMap: { [key: number]: CompanySection } = {};

        // Initialize sectionMap with existing company sections
        companySections.forEach((section) => {
            sectionMap[section.id as number] = { ...section, products: [] };
        });

        // Group products by their section_id
        products.forEach((product) => {
            if (product.section_id && sectionMap[product.section_id]) {
                sectionMap[product.section_id].products.push(product);
            } else {
                // Handle products without a matching section_id
                if (!sectionMap[-1]) {
                    sectionMap[-1] = {
                        id: -1,
                        name: "Unnamed section",
                        company_id: -1,
                        products: [],
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    };
                }
                sectionMap[-1].products.push(product);
            }
        });

        return Object.values(sectionMap);
    }, [products, companySections]);

    return sectionsWithProducts.map((section) => (
        <CategoryEditSection key={section.id} section={section} />
    ));
}
