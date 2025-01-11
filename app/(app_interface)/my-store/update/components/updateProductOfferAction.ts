"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function updateProductOfferAction(
    payload: Record<string, any>,
    offerId: number
) {
    revalidatePath("/");
    if (!payload.product_id || !payload.user_id) {
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
        const response = await fetch(
            `${API_URL}/update-offer/${offerId}`,
            options
        );
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
