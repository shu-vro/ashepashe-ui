"use server";

import { API_URL } from "@/lib/var";
import { revalidatePath } from "next/cache";

export async function reportAction(prevState: any, data: FormData) {
    revalidatePath("/");
    const formData = Object.fromEntries(data.entries());
    if (!formData.report) {
        return { status: 400, message: "Report is required" };
    }
    const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            report: formData.report.toString(),
        }),
    };

    try {
        const response = await fetch(`${API_URL}/reports`, options);
        const data = await response.json();
        console.log(data);
        return {
            status: response.status,
            message: data?.message || Object.values(data.errors).join("\n"),
        };
    } catch (error: any) {
        return { status: 500, message: error.message };
    }
}
