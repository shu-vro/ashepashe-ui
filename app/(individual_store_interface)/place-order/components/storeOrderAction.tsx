"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function storeOrderAction(payload: Record<string, any>) {
    revalidatePath("/");
    if (!payload.user_id) {
        return {
            status: 402,
            message: "Payload incomplete",
        };
    }
    try {
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
        };
        const response = await fetch(`${API_URL}/store-order`, options);
        // if (response.status !== 200) {
        //     return {
        //         status: response.status,
        //         message: response.statusText,
        //     };
        // }

        const data = await response.json();
        return {
            status: response.status,
            message: data?.message || Object.values(data.errors).join("\n"),
        };
    } catch (error) {
        return error;
    }
}
