"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

export default function Sonner() {
    const { theme } = useTheme();
    return (
        <Toaster
            richColors
            position="top-center"
            theme={theme as any}
            expand
            pauseWhenPageIsHidden
        />
    );
}
