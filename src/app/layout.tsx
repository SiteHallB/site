import type { Metadata } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Footer from "@/components/footer";
import PopUp from "@/components/pop-up";

import Script from "next/script";

import { LinkProvider } from "@/context/link-context";
import GoogleAnalyticsProvider from "@/components/analytics/google-analytics-provider";
import { ImageProvider } from "@/context/image-context";
import { FormuleProvider } from "@/context/formule-context";
import { ContactProvider } from "@/context/contact-context";

import { Toast } from "@/components/ui/toast";

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
