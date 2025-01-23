"use client";

import React from "react";
import { CreateStoreModal } from "../../../(app_interface)/components/Header/UserDropdown";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    return (
        <CreateStoreModal
            isOpen={true}
            onOpenChange={() => {
                router.back();
            }}
        />
    );
}
