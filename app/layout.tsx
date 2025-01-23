import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Gradient from "./(app_interface)/components/Gradient";
import "./(app_interface)/globals.css";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const APP_NAME = "AAmarStore";
const APP_DEFAULT_TITLE = "AAmarStore";
const APP_TITLE_TEMPLATE = "%s • AAmarStore";
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
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 2,
    width: "device-width",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth max-sm:text-[12px]">
            <body className={`${font.className} antialiased`}>
                <Gradient />
                {children}
            </body>
        </html>
    );
}
