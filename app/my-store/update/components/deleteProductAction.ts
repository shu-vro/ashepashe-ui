"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteProductAction(
    param: Record<string, any>,
    slug: string
) {
    if (!slug) {
        return { status: 400, message: "Invalid product slug." };
    }
    revalidatePath("/");
    const options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            user_id: param.user_id,
        }),
    };

    try {
        const response = await fetch(
            `${API_URL}/create-store/${slug}/delete-product`,
            options
        );
        if (response.status !== 200) {
            return {
                status: response.status,
                message: response.statusText,
            };
        }
        // console.log(`${API_URL}/create-store/${slug}/delete-product`, response);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
