"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteOfferAction(payload: {
    offerId?: Company["id"];
    userId?: User["id"];
}) {
    if (!payload.offerId || !payload.userId) {
        return {
            status: 402,
            message: "offerId is required",
        };
    }

    const options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            user_id: payload.userId,
        }),
    };

    try {
        const response = await fetch(
            `${API_URL}/delete-offer/${payload.offerId}`,
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
    } finally {
        revalidatePath("/");
    }
}
