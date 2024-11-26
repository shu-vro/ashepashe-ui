"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
const NextThemesProvider = dynamic(
    () => import("next-themes").then((e) => e.ThemeProvider),
    {
        ssr: false,
    }
);

// import { type ThemeProviderProps } from 'next-themes/dist/types'
import dynamic from "next/dynamic";

export default function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            <NextUIProvider>{children}</NextUIProvider>
        </NextThemesProvider>
    );
}
