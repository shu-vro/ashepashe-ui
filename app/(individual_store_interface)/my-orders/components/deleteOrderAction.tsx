"use server";
// https://asepashe.com/api/delete-order/12

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(payload: {
    order_id: number;
    user_id?: number;
}) {
    revalidatePath("/");
    if (!payload.user_id) {
        return {
            status: 400,
            message: "User ID is required",
        };
    }
    console.log(payload.order_id);
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_id: payload.user_id }),
    };

    try {
        const response: Response = await fetch(
            `${API_URL}/delete-order/${payload.order_id}`,
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
