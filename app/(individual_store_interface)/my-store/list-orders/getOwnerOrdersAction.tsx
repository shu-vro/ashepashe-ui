"use server";

// https://asepashe.com/api/get-order/{company_id}

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function getOwnerOrdersAction(payload: {
    company_id: number;
    // user_id?: number;
}) {
    revalidatePath("/");
    // if (!payload.user_id) {
    //     return {
    //         status: 400,
    //         message: "User ID is required",
    //     };
    // }
    // console.log(payload.order_id);
    const options = {
        method: "GET",
        headers: { "content-type": "application/json" },
        // body: JSON.stringify({ user_id: payload.user_id }),
    };

    try {
        const response: Response = await fetch(
            `${API_URL}/owner-order/${payload.company_id}`,
            options
        );
        console.log(`${API_URL}/get-order/${payload.company_id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
