// /api/delete-orderitem/{order_item id}

"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteOrderItemAction(payload: {
    order_item_id: number;
    user_id?: number;
}) {
    revalidatePath("/");
    if (!payload.user_id) {
        return {
            status: 400,
            message: "User ID is required",
        };
    }
    const options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify({ user_id: payload.user_id }),
    };

    try {
        const response: Response = await fetch(
            `${API_URL}/delete-orderitem/${payload.order_item_id}`,
            options
        );
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
