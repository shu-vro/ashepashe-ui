"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function updateSectionAction(payload: {
    name: string;
    sectionId?: Company["id"];
}) {
    revalidatePath("/");
    if (!payload.name || !payload.sectionId) {
        return {
            status: 402,
            message: "Name is required",
        };
    }

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: payload.name,
            section_id: payload.sectionId,
        }),
    };

    try {
        const response = await fetch(`${API_URL}/update-section`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
