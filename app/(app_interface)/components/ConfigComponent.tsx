"use client";

import { useSidebar } from "@/components/ui/sidebar";
import React, { useEffect } from "react";

type Props = {};

export default function ConfigComponent({}: Props) {
    const sidebar = useSidebar();

    useEffect(() => {
        if (!sidebar.isMobile) {
            sidebar.setOpen(false);
        }
    }, [sidebar.isMobile]);

    return null;
}
