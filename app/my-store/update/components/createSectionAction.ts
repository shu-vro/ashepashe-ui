"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function createSectionAction(payload: {
    name: string;
    companyId?: Company["id"];
}) {
    revalidatePath("/");
    if (!payload.name || !payload.companyId) {
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
            company_id: payload.companyId,
        }),
    };

    try {
        const response = await fetch(`${API_URL}/create-section`, options);

        if (response.status !== 200) {
            return {
                status: response.status,
                message: response.statusText,
            };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
