import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Footer from "@/components/footer";
import PopUp from "@/components/popup";

import Script from "next/script";

import { LinkProvider } from "@/context/link-context";
import GoogleAnalyticsProvider from "@/components/analytics/google-analytics-provider";
import { ImageProvider } from "@/context/image-context";
import { FormuleProvider } from "@/context/formule-context";
import { ContactProvider } from "@/context/contact-context";

import { Toast } from "@/components/ui/toast";

export const viewport: Viewport = {
    themeColor: "#242424",
    width: "device-width", 
    height: "device-height", 
    initialScale: 1, 
    colorScheme: 'dark',
};

export const metadata: Metadata = {
  icons: {
        icon: [
            { url: "/favicon/favicon.ico" },
            { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
            { url: "/favicon/favicon-32x32.png", sizes: "32x32" }
        ],
        apple: "/favicon/apple-touch-icon.png",
        shortcut: "/favicon/favicon.ico",
    },
    manifest: "/favicon/site.webmanifest.json",

    openGraph: {
        title: "HALL B",
        description: "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nimes): musculation haut de gamme, cours collectifs, smallGroups, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !",
        url: "https://hallb.fr",
        type: "website",
        siteName: "HALL B",
        images: [
            {
                url: "https://hallb.fr/favicon/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "HALL B salle de sport Saint Dionisy"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "HALL B",
        description: "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nimes): musculation haut de gamme, cours collectifs, smallGroups, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !",
        images: ["https://hallb.fr/favicon/og-image.jpg"],
    },

    other: {
        "msapplication-TileColor": "#242424",
        "msapplication-TileImage": "/favicon/mstile-150x150.png"
    }
};

export default function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="fr">
            <head>
                {/* 1. Charge la config d'abord */}
                <Script
                src="/klaro-config.js"
                strategy="beforeInteractive"
                />
                {/* 2. Charge Klaro juste après */}
                <Script
                src="https://cdn.kiprotect.com/klaro/latest/klaro.js"
                strategy="beforeInteractive"
                />
            </head>
            <body className="antialiased">
                <GoogleAnalyticsProvider/>
                <LinkProvider>
                <ImageProvider>
                <FormuleProvider>
                <ContactProvider>

                    <header>
                        <Menu/>
                    </header>

                    <PopUp/>
                    <Toast/>

                    {/* Contenu principal */}
                    <div className="relative w-full">
                        {children}
                        <Footer/>
                    </div>
                    
                </ContactProvider>
                </FormuleProvider>
                </ImageProvider>
                </LinkProvider>
            </body>
        </html>
    );
}
