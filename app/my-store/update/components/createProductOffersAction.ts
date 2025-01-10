"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function createProductOffersAction(payload: Record<string, any>) {
    revalidatePath("/");
    if (!payload.user_id || !payload.product_id) {
        return {
            status: 402,
            message: "Payload incomplete",
        };
    }

    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(`${API_URL}/store-offer`, options);
        const data = await response.json();
        return {
            status: response.status,
            message:
                data?.message || Object.values(data?.errors).flat().join(",\n"),
        };
    } catch (error) {
        console.log(error);
        return error;
    }
}
