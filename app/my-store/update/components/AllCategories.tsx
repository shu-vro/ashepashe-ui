import React, { useEffect, useMemo, useState } from "react";
import CategoryEditSection from "./CategoryEditSection";
import { API_URL } from "@/lib/var";

export default function AllCategories({ companyId }: { companyId?: number }) {
    const [sections, setSections] = useState<Category[]>([]);
    useMemo(() => {
        (async () => {
            if (!companyId) return;
            const response = await fetch(`${API_URL}/sections`);
            const data = (await response.json()) as Category[];
            setSections(
                data.filter((section) => section.company_id === companyId)
            );
        })();
    }, []);

    if (!sections.length) return null;

    return sections.map((section) => (
        <CategoryEditSection
            key={section.id}
            section={section.name}
            id={section.id}
        />
    ));
}
