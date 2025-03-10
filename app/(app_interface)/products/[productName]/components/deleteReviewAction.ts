"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteReviewAction(payload: Record<string, any>) {
    revalidatePath("/");
    if (!payload.userId || !payload.reviewId) {
        return {
            status: 402,
            message: "Payload incomplete",
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
            `${API_URL}/delete-review/${payload.reviewId}`,
            options
        );

        const data = await response.json();
        return {
            status: response.status,
            message: data?.message || Object.values(data.errors).join("\n"),
        };
    } catch (error) {
        return error;
    }
}
