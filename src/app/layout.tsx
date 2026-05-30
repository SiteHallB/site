import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import Menu from "@/components/menu";
import Footer from "@/components/footer";
import PopUp from "@/components/popup";

import Script from "next/script";

import { Montserrat } from "next/font/google";

import { LinkProvider } from "@/context/link-context";
import GoogleAnalyticsProvider from "@/components/analytics/google-analytics-provider";
import { ImageProvider } from "@/context/image-context";
import { FormuleProvider } from "@/context/formule-context";
import { ContactProvider } from "@/context/contact-context";

import { Toast } from "@/components/ui/toast";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-montserrat-loaded",
});

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width", 
    height: "device-height", 
    initialScale: 1, 
    colorScheme: 'dark',
};

export const metadata: Metadata = {
    metadataBase: new URL("https://www.hallb.fr"),
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
        description: "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nîmes, Gard) : musculation haut de gamme, cours collectifs, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !",
        url: "https://www.hallb.fr",
        type: "website",
        siteName: "HALL B",
        images: [
            {
                url: "https://www.hallb.fr/favicon/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "HALL B salle de sport Saint Dionisy"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "HALL B",
        description: "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nîmes, Gard) : musculation haut de gamme, cours collectifs, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !",
        images: ["https://www.hallb.fr/favicon/og-image.jpg"],
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
        <html lang="fr" className={montserrat.variable}>
            <head>
                {/* Précharge la police critique des titres (above-the-fold) */}
                <link
                    rel="preload"
                    href="/fonts/FutureTense-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

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

                {/* Schema.org — rendu côté serveur pour être présent dans le HTML initial */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["HealthClub", "ExerciseGym"],
                        "@id": "https://www.hallb.fr/#business",
                        "name": "HALL B",
                        "description": "Salle de sport de 2 400 m² à Saint-Dionisy (Vaunage, Gard), à 15 min de Nîmes : musculation Panatta & Technogym, cours collectifs, squash, aquagym, danse et pôle santé.",
                        "image": "https://www.hallb.fr/favicon/og-image.jpg",
                        "logo": "https://www.hallb.fr/images/logo.png",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "1 chemin Azord",
                            "addressLocality": "Saint Dionisy",
                            "postalCode": "30980",
                            "addressCountry": "FR"
                        },
                        "telephone": "+33 4 66 19 16 76",
                        "url": "https://www.hallb.fr",
                        "areaServed": [
                            {"@type": "City", "name": "Nîmes"},
                            {"@type": "City", "name": "Saint Dionisy"},
                            {"@type": "City", "name": "Calvisson"},
                            {"@type": "City", "name": "Sommières"},
                            {"@type": "City", "name": "Quissac"},
                            {"@type": "City", "name": "Caveirac"},
                            {"@type": "AdministrativeArea", "name": "Vaunage"},
                            {"@type": "AdministrativeArea", "name": "Gard"}
                        ],
                        "priceRange": "€€",
                        "openingHoursSpecification": [
                            {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday"
                            ],
                            "opens": "06:00",
                            "closes": "23:00"
                            }
                        ],
                        "amenityFeature": [
                            {"@type": "LocationFeatureSpecification", "name": "Plateau de musculation", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Espace cardio-training", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Cours collectifs", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Small groups", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Squash", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Aquagym et bassin chauffé", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "École de danse", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Pôle santé", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Parking gratuit", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Vestiaires et douches", "value": true},
                            {"@type": "LocationFeatureSpecification", "name": "Accès 7j/7 de 6h à 23h", "value": true}
                        ]
                        }),
                    }}
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

                    {/* <PopUp/> */}
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
