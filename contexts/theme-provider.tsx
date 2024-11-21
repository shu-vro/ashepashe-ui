"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
            enableSystem>
            <NextUIProvider>{children}</NextUIProvider>
        </NextThemesProvider>
    );
}
