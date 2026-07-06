import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import Script from "next/script";
import { draftMode } from "next/headers";

import Menu, { type MenuData } from "@/components/menu";
import Footer, { type FooterData } from "@/components/footer";
import PopUp from "@/components/popup";
import { Toast } from "@/components/ui/toast";
import LivePreviewListener from "@/components/live-preview-listener";
import GoogleAnalyticsProvider from "@/components/analytics/google-analytics-provider";

import { LinkProvider } from "@/context/link-context";
import { ImageProvider } from "@/context/image-context";
import { ContactProvider } from "@/context/contact-context";
import type { ImageType } from "@/context/image-context";

import { getCollection, getGlobal } from "@/lib/cms";
import { img, mediaUrl } from "@/lib/media";
import { bodyFontStack, fontVariables, headingFontStack } from "@/lib/fonts";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

/* Valeurs de secours (design d'origine) si le CMS n'est pas encore rempli. */
const LOGO_DEFAUT: ImageType = { src: "/images/logo.png", width: 1240, height: 1328, alt: "Logo HALL B" };
const OG_DESCRIPTION_DEFAUT =
    "Salle de sport 2 400 m² à Saint Dionisy (Vaunage, proche de Nîmes, Gard) : musculation haut de gamme, cours collectifs, squash, danse, aquagym, pôle santé. Essayez HALL B gratuitement !";

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getGlobal("parametres-seo");
    const titre = seo?.titreParDefaut || "HALL B";
    const description = seo?.descriptionParDefaut || OG_DESCRIPTION_DEFAUT;
    const image = mediaUrl(seo?.imagePartage, SITE_URL) || `${SITE_URL}/favicon/og-image.jpg`;

    return {
        metadataBase: new URL(SITE_URL),
        icons: {
            icon: [
                { url: "/favicon/favicon.ico" },
                { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
                { url: "/favicon/favicon-32x32.png", sizes: "32x32" },
            ],
            apple: "/favicon/apple-touch-icon.png",
            shortcut: "/favicon/favicon.ico",
        },
        manifest: "/favicon/site.webmanifest.json",

        openGraph: {
            title: titre,
            description,
            url: SITE_URL,
            type: "website",
            siteName: titre,
            images: [{ url: image, width: 1200, height: 630, alt: `${titre} salle de sport Saint Dionisy` }],
        },

        twitter: {
            card: "summary_large_image",
            title: titre,
            description,
            images: [image],
        },

        other: {
            "msapplication-TileColor": "#242424",
            "msapplication-TileImage": "/favicon/mstile-150x150.png",
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled: draft } = await draftMode();

    const [theme, coordonnees, navigation, seo, popup, accueil, temoignagesDocs] = await Promise.all([
        getGlobal("theme", draft),
        getGlobal("coordonnees", draft),
        getGlobal("navigation", draft),
        getGlobal("parametres-seo", draft),
        getGlobal("popup", draft),
        getGlobal("accueil", draft),
        getCollection("temoignages"),
    ]);

    const couleurs = theme?.couleurs;
    const polices = theme?.polices;
    const logo = img(theme?.logo, LOGO_DEFAUT) as ImageType;

    /* Variables CSS surchargées depuis le back-office (couleurs + polices). */
    const themeStyle = {
        "--color-accent": couleurs?.accent || "#E1C340",
        "--color-background-base": couleurs?.fondPrincipal || "#121212",
        "--color-background-highlight": couleurs?.fondCartes || "#242424",
        "--color-background-subdued": couleurs?.fondSombre || "#000000",
        "--color-foreground-base": couleurs?.texte || "#FFFFFF",
        "--color-foreground-subdued": couleurs?.texteAttenue || "#FFFFFF99",
        "--color-yes": couleurs?.positif || "#15803D",
        "--color-no": couleurs?.negatif || "#EF4444",
        "--font-futuretense": headingFontStack(polices?.titres),
        "--font-montserrat": bodyFontStack(polices?.corps),
    } as React.CSSProperties;

    /* Données du menu. */
    const menuData: MenuData = {
        liensPrincipaux: navigation?.liensPrincipaux?.map((l) => ({
            label: l.label,
            url: l.url,
            externe: l.externe ?? false,
        })) ?? [
            { label: "Accueil", url: "/", externe: false },
            { label: "Tarifs", url: "/tarifs", externe: false },
            { label: "Carte cadeau", url: "/carte-cadeau", externe: false },
            { label: "Plannings", url: "/plannings", externe: false },
            { label: "Nos cours", url: "/cours", externe: false },
            { label: "Nous contacter", url: "/contact", externe: false },
        ],
        liensSecondaires: navigation?.liensSecondaires?.map((l) => ({
            label: l.label,
            url: l.url,
            externe: l.externe ?? false,
        })) ?? [
            { label: "Natation enfant", url: "/natation-enfant-vaunage", externe: false },
            { label: "Réservation Squash", url: "/squash", externe: false },
        ],
        boutons: navigation?.boutonsBarre?.map((b) => ({
            texte: b.texte,
            url: b.url,
            style: (b.style ?? "primary") as "primary" | "accent",
        })) ?? [
            { texte: "Essai Offert", url: "/essai-offert", style: "primary" },
            { texte: "Je m'inscris", url: "/tarifs", style: "accent" },
        ],
        imageMenu: img(navigation?.imageMenu, {
            src: "/images/crossfit.webp",
            width: 3024,
            height: 4032,
            alt: "Allée crossfits et machines de musculation",
        }) as ImageType,
    };

    /* Données du pied de page. */
    const temoignages = temoignagesDocs
        .filter((t) => t.visible !== false)
        .map((t) => ({ nom: t.nom, texte: t.texte, note: t.note ?? 5 }));

    const footerData: FooterData = {
        logo,
        partenaires:
            coordonnees?.partenaires
                ?.map((p) => ({
                    nom: p.nom,
                    url: p.url,
                    logo: img(p.logo),
                }))
                .filter((p): p is { nom: string; url: string; logo: ImageType } => Boolean(p.logo)) ?? [],
        adresseAffichage: coordonnees?.adresse?.affichage || "1 Chem. d'Azord, 30980 Saint-Dionisy",
        liensLegaux: navigation?.liensLegaux?.map((l) => ({ label: l.label, url: l.url })) ?? [
            { label: "FAQ", url: "/faq" },
            { label: "Mentions Légales", url: "/mentions-legales" },
            { label: "Politique de confidentialité", url: "/politique-confidentialite" },
        ],
        avis: {
            source: (accueil?.temoignages?.source ?? "google") as "google" | "manuel",
            temoignages,
        },
    };

    /* Liens & contacts partagés via contextes (composants clients). */
    const liens: Record<string, string> = {
        osteo: coordonnees?.osteo || "",
        adresse: coordonnees?.adresse?.lienGoogleMaps || "",
        instagram: coordonnees?.reseaux?.instagram || "",
        instagramLabel: coordonnees?.reseaux?.instagramLabel || "hallb.fr",
        facebook: coordonnees?.reseaux?.facebook || "",
        facebookLabel: coordonnees?.reseaux?.facebookLabel || "HALL B",
        avis: coordonnees?.reseaux?.avisGoogle || "",
    };

    const contact: Record<string, string> = {
        numero: coordonnees?.telephone || "04 66 19 16 76",
        email: coordonnees?.email || "contact@hallb.fr",
        horairesOuverture: coordonnees?.horaires?.ouverture || "Ouvert 6h-23h 7/7j",
        horairesReception:
            coordonnees?.horaires?.reception || "Réception LUN-VEN 9-13h•16-21h / SAM 9-13h•15h30-19h",
    };

    const images: Record<string, ImageType> = { logo };

    /* Données structurées Google (LocalBusiness). */
    const fiche = seo?.ficheGoogle;
    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": ["HealthClub", "ExerciseGym"],
        "@id": `${SITE_URL}/#business`,
        name: fiche?.nom || "HALL B",
        description: fiche?.description || OG_DESCRIPTION_DEFAUT,
        image: mediaUrl(seo?.imagePartage, SITE_URL) || `${SITE_URL}/favicon/og-image.jpg`,
        logo: mediaUrl(fiche?.logo, SITE_URL) || `${SITE_URL}/images/logo.png`,
        address: {
            "@type": "PostalAddress",
            streetAddress: coordonnees?.adresse?.rue || "1 chemin Azord",
            addressLocality: coordonnees?.adresse?.ville || "Saint Dionisy",
            postalCode: coordonnees?.adresse?.codePostal || "30980",
            addressCountry: "FR",
        },
        telephone: contact.numero,
        url: SITE_URL,
        areaServed: fiche?.zonesDesservies?.map((z) => ({ "@type": z.type ?? "City", name: z.nom })) ?? [],
        priceRange: fiche?.gammePrix || "€€",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: coordonnees?.horaires?.ouvertureGoogle || "06:00",
                closes: coordonnees?.horaires?.fermetureGoogle || "23:00",
            },
        ],
        amenityFeature:
            fiche?.equipements?.map((e) => ({
                "@type": "LocationFeatureSpecification",
                name: e.nom,
                value: true,
            })) ?? [],
    };

    const policeTitres = polices?.titres ?? "futuretense";

    return (
        <html lang="fr" className={fontVariables} style={themeStyle}>
            <head>
                {/* Précharge la police critique des titres (above-the-fold) */}
                {policeTitres === "futuretense" && (
                    <link
                        rel="preload"
                        href="/fonts/FutureTense-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                )}

                {/* 1. Charge la config d'abord */}
                <Script src="/klaro-config.js" strategy="beforeInteractive" />
                {/* 2. Charge Klaro après l'hydratation : non bloquant pour le rendu. */}
                <Script src="https://cdn.kiprotect.com/klaro/latest/klaro.js" strategy="afterInteractive" />

                {/* Schema.org — rendu côté serveur pour être présent dans le HTML initial */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
                />
            </head>
            <body className="antialiased">
                <GoogleAnalyticsProvider />
                <LinkProvider value={liens}>
                    <ImageProvider value={images}>
                        <ContactProvider value={contact}>
                            <header>
                                <Menu data={menuData} />
                            </header>

                            {popup?.actif && (
                                <PopUp
                                    titre={popup.titre || "Essai Offert"}
                                    sousTitre={popup.sousTitre || ""}
                                    texte={popup.texte || ""}
                                    bouton={{
                                        texte: popup.bouton?.texte || "J'en profite",
                                        url: popup.bouton?.url || "/essai-offert",
                                    }}
                                    delai={popup.delai ?? 1000}
                                />
                            )}
                            <Toast />

                            {/* Contenu principal */}
                            <div className="relative w-full">
                                {children}
                                <Footer data={footerData} />
                            </div>

                            {draft && <LivePreviewListener />}
                        </ContactProvider>
                    </ImageProvider>
                </LinkProvider>
            </body>
        </html>
    );
}
