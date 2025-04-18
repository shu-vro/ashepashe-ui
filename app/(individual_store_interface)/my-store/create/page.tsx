"use client";

import React, { use, useEffect } from "react";
import { CreateStoreModal } from "../../../(app_interface)/components/Header/UserDropdown";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

export default function page() {
    const router = useRouter();
    const useUser = use(UserContext);
    useEffect(() => {
        if (useUser?.userCompany) router.push("/my-store/update");
    }, [useUser?.userCompany]);

    return useUser && !useUser.userCompany ? (
        <CreateStoreModal
            isOpen={Boolean(useUser && !useUser.userCompany)}
            isDismissable={false}
            isKeyboardDismissDisabled={false}
            onOpenChange={() => {
                router.push("/my-store/update");
            }}
            onClose={() => {
                router.push("/");
            }}
        />
    ) : (
        "Redirecting to Update Page..."
    );
}
