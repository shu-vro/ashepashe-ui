"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function uploadImageAction(payload: {
    data: string;
    slug: Company["slug"];
}) {
    revalidatePath("/");
    if (!payload.data || !payload.slug) {
        return {
            status: 402,
            message: "Payload incomplete " + JSON.stringify(payload),
        };
    }

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            data: payload.data,
            company_slug: payload.slug,
        }),
    };

    try {
        const response = await fetch(
            `${API_URL}/create-store/store-img/${payload.slug}`,
            options
        );
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
