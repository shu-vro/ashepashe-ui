import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./(app_interface)/globals.css";
import Script from "next/script";
// import ReactPixel from "react-facebook-pixel";
// import dynamic from "next/dynamic";

// const PixelTracker = dynamic(() => import("./components/PixelTracker"), { ssr: false });

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
                <Script id="facebook-pixel" strategy="lazyOnload">
                    {`
                        !(function (f, b, e, v, n, t, s) {
                            if (f.fbq) return;
                            n = f.fbq = function () {
                                n.callMethod
                                    ? n.callMethod.apply(n, arguments)
                                    : n.queue.push(arguments);
                            };
                            if (!f._fbq) f._fbq = n;
                            n.push = n;
                            n.loaded = !0;
                            n.version = "2.0";
                            n.queue = [];
                            t = b.createElement(e);
                            t.async = !0;
                            t.src = v;
                            s = b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t, s);
                        })(
                            window,
                            document,
                            "script",
                            "https://connect.facebook.net/en_US/fbevents.js"
                        );
                        fbq("init", "3276434292511264");
                        fbq("track", "PageView");
                    `}
                </Script>
            </head>
            <body className={`${font.className} antialiased`}>{children}</body>
        </html >
    );
}
