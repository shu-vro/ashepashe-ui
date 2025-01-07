import React, { use, useEffect, useState } from "react";
import CategoryEditSection from "./CategoryEditSection";
import { API_URL } from "@/lib/var";
import { UserContext } from "@/contexts/UserContext";

export default function AllCategories({ companyId }: { companyId?: number }) {
    const [sections, setSections] = useState<Category[]>([]);
    // useEffect(() => {
    //     (async () => {
    //         if (!companyId) return;
    //         const response = await fetch(`${API_URL}/sections`);
    //         const data = (await response.json()) as Category[];
    //         setSections(
    //             data.filter((section) => section.company_id === companyId)
    //         );
    //     })();
    // }, []);
    const useUser = use(UserContext);

    useEffect(() => {
        setSections(useUser?.companySections || []);
        console.log(useUser?.companySections);
    }, [useUser?.companySections]);

    if (!sections || !sections.length) return null;

    return sections.map((section) => (
        <CategoryEditSection
            key={section.id}
            section={section.name}
            id={section.id}
        />
    ));
}
