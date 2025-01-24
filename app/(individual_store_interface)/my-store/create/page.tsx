"use client";

import React, { use } from "react";
import { CreateStoreModal } from "../../../(app_interface)/components/Header/UserDropdown";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

export default function page() {
    const router = useRouter();
    const useUser = use(UserContext);
    if (!useUser || !useUser.user) return router.push("/");
    if (useUser.userCompany) return router.push("/my-store/update");
    return (
        <CreateStoreModal
            isOpen={true}
            onOpenChange={() => {
                router.back();
            }}
        />
    );
}
