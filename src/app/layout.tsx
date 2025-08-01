import type { Metadata } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Footer from "@/components/footer";
import PopUp from "@/components/pop-up";

import Script from "next/script";

import { LinkProvider } from "@/context/link-context";
import GoogleAnalyticsProvider from "@/components/analytics/google-analytics-provider";

export const metadata: Metadata = {
    title: "Hall B",
    description: "Hall B",
    icons: {
        icon: '/favicon/favicon.ico',
        shortcut: '/favicon/favicon.ico',
        apple: '/favicon/apple-touch-icon.png',
    },
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
                <LinkProvider
                    links={{
                        osteo: "", 
                        adresse: "https://maps.app.goo.gl/8NkxFXwWUCSQMxDLA", 
                        instagram: "https://www.instagram.com/hallb.fr/", 
                        facebook: "https://www.facebook.com/p/HALL-B-61576081445951/", 
                        avis: "https://maps.app.goo.gl/q6AxEJa8WjfwpBVw8", 
                        pannata: "https://www.panattasport.com/fr/", 
                        technogym: "https://www.technogym.com/fr-FR/", 
                        pallini: "https://www.pallini-sport.fr/", 
                    }}
                >
                <PopUp/>
                <Menu/>
                <div className="relative w-full">
                    {children}
                    <Footer/>
                </div>
                </LinkProvider>
            </body>
        </html>
    );
}
