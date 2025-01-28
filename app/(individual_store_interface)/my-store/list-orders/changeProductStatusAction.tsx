"use server";

// https://asepashe.com/api/order-items-status/

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function changeProductStatusAction(payload: Record<string, any>) {
    revalidatePath("/");
    if (!payload.item_id || !payload.status) {
        return {
            status: 402,
            message: "Payload incomplete",
        };
    }
    try {
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                item_id: payload.item_id,
                status: payload.status,
            }),
        };
        console.log(payload);
        const response = await fetch(`${API_URL}/order-items-status`, options);

        const data = await response.json();
        return {
            status: response.status,
            message: data?.message || Object.values(data.errors).join("\n"),
        };
    } catch (error) {
        return error;
    }
}
