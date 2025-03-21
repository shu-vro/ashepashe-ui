import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
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
            rel: "icon",
            url: "/favicon.ico",
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
    keywords: [
        "AAmarStore",
        "Store",
        "Ecommerce",
        "Online Store",
        "Free",
        "Easy",
    ],
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
        <html lang="en" className="scroll-smooth">
            <head>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-XS4GVCRWPB"></Script>
                <Script id="gtag" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-XS4GVCRWPB');
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

                {/* Google Tag Manager - head part */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(w,d,s,l,i){
                w[l] = w[l] || []; 
                w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'}); 
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
                j.async=true; 
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; 
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PMRZ564N');
            `,
                    }}
                ></script>


            </head>
            <body className={`${font.className} antialiased`}>

                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PMRZ564N"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>



                {children}
            </body>
        </html>
    );
}
