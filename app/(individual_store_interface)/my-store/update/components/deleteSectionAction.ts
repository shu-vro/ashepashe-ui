"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function deleteSectionAction(payload: {
    sectionId?: Company["id"];
}) {
    if (!payload.sectionId) {
        return {
            status: 402,
            message: "SectionId is required",
        };
    }

    const options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    };

    try {
        const response = await fetch(
            `${API_URL}/delete-section/${payload.sectionId}`,
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
    } finally {
        revalidatePath("/");
    }
}
