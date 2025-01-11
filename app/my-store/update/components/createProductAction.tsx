"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: { name: string }) {
    revalidatePath("/");
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${API_URL}/add-product`, options);
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
    }
}
