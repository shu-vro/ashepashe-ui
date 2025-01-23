"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function updateStoreAction(payload: {
    data: Record<string, any>;
    store_slug?: Company["slug"];
    userId?: User["id"];
}) {
    revalidatePath("/");
    if (!payload.data || !payload.store_slug || !payload.userId) {
        return;
    }

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload.data, user_id: payload.userId }),
    };

    try {
        const response = await fetch(
            `${API_URL}/create-store/${payload.store_slug}/update-info`,
            options
        );

        const data = await response.json();
        return {
            status: response.status,
            message:
                data?.message ||
                Object.values(data.errors).join(", ") ||
                response.statusText,
        };
    } catch (error) {
        return error;
    }
}
