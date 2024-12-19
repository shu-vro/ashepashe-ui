import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import ThemeProvider from "@/contexts/theme-provider";
import Header from "./components/Header";
import Gradient from "./components/Gradient";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import ConfigComponent from "./components/ConfigComponent";
import "@smastrom/react-rating/style.css";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import Sonner from "./components/Sonner";
import { SessionProvider } from "next-auth/react";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const APP_NAME = "AsePashe";
const APP_DEFAULT_TITLE = "AsePashe";
const APP_TITLE_TEMPLATE = "%s • AsePashe";
const APP_DESCRIPTION = "Best app in the world!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <html lang="en" className="scroll-smooth max-sm:text-[12px]">
                <body className={`${font.className} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        <SidebarProvider>
                            <AppSidebar />
                            <main className="w-full lap:max-w-screen-lap mx-auto">
                                <Header />
                                <Gradient />
                                {children}
                                <Sonner />
                                <ConfigComponent />
                            </main>
                        </SidebarProvider>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
