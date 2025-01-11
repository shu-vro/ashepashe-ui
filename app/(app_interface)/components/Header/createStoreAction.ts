"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function createStoreAction(
    data: { name: string },
    userId: User["id"]
) {
    revalidatePath("/");
    const name = data.name;
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, user_id: userId }),
    };

    try {
        const response = await fetch(`${API_URL}/create-store`, options);
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
