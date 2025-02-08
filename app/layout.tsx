import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./(app_interface)/globals.css";
import Script from "next/script";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const APP_NAME = "AAmarStore";
const APP_DEFAULT_TITLE = "AAmarStore";
const APP_TITLE_TEMPLATE = "%s • AAmarStore";
const APP_DESCRIPTION = "Create Your Store within 30 seconds!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    icons: [
        {
            url: "/android/android-launchericon-48-48.png",
        },
    ],
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
            <head>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-JB1GVQCD1G"></Script>
                <Script id="gtag" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-JB1GVQCD1G');
                    `}
                </Script>
            </head>
            <body className={`${font.className} antialiased`}>{children}</body>
        </html>
    );
}
