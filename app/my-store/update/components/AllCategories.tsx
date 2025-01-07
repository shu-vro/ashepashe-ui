import React, { use, useEffect, useState } from "react";
import CategoryEditSection from "./CategoryEditSection";
import { API_URL } from "@/lib/var";
import { UserContext } from "@/contexts/UserContext";

export default function AllCategories({ companyId }: { companyId?: number }) {
    const useUser = use(UserContext);

    if (!useUser) return null;
    const { companySections } = useUser;

    if (!companySections || !companySections.length) return null;

    return companySections.map((section) => (
        <CategoryEditSection
            key={section.id}
            section={section.name}
            id={section.id}
        />
    ));
}
