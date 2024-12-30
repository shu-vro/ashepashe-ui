"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function updateStoreAction(payload: {
    data: Record<string, any>;
    userId?: User["id"];
    store_slug?: Company["slug"];
}) {
    revalidatePath("/");
    if (!payload.userId || !payload.data || !payload.store_slug) {
        return;
    }

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload.data),
    };

    try {
        const response = await fetch(
            `${API_URL}/create-store/${payload.store_slug}/update-info`,
            options
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
