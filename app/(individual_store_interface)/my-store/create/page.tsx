"use client";

import React, { use, useEffect } from "react";
import { CreateStoreModal } from "../../../(app_interface)/components/Header/UserDropdown";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

export default function page() {
    const router = useRouter();
    const useUser = use(UserContext);
    // if (!useUser || !useUser.user) return router.push("/");
    // if (useUser.userCompany) return router.push("/my-store/update");
    useEffect(() => {
        // if (!useUser || !useUser.user) router.push("/");
        if (useUser?.userCompany) router.push("/my-store/update");
    }, [useUser?.userCompany]);

    return useUser && !useUser.userCompany ? (
        <CreateStoreModal
            isOpen={Boolean(useUser && !useUser.userCompany)}
            isDismissable={false}
            isKeyboardDismissDisabled={false}
            onOpenChange={() => {
                router.back();
            }}
        />
    ) : (
        "Redirecting to Update Page..."
    );
}
