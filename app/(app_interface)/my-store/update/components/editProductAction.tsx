"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function editProductAction(
    data: Record<string, any>,
    slug: string
) {
    if (!slug) {
        return { status: 400, message: "Invalid product slug." };
    }
    // if (!data.image1) {
    //     return {
    //         status: 400,
    //         message: "Product image is required.",
    //     };
    // }
    revalidatePath("/");
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(
            `${API_URL}/create-store/${slug}/update-product`,
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
    }
}
