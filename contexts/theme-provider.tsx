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
import { useRouter } from "next/navigation";

export default function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const router = useRouter();
    return (
        <NextThemesProvider {...props}>
            <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </NextThemesProvider>
    );
}
