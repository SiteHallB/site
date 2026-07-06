/**
 * Polices proposées dans le back-office (Apparence → Polices).
 * Toutes sont déclarées ici : seules celles réellement utilisées sont téléchargées
 * par le navigateur (preload désactivé pour les polices alternatives).
 */
import { Anton, Bebas_Neue, Inter, Montserrat, Open_Sans, Oswald } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-montserrat-loaded",
});

export const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
    preload: false,
    variable: "--font-bebas",
});

export const oswald = Oswald({
    subsets: ["latin"],
    display: "swap",
    preload: false,
    variable: "--font-oswald",
});

export const anton = Anton({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
    preload: false,
    variable: "--font-anton",
});

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: false,
    variable: "--font-inter",
});

export const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    preload: false,
    variable: "--font-opensans",
});

/** Toutes les variables CSS de police, à poser sur <html>. */
export const fontVariables = [
    montserrat.variable,
    bebas.variable,
    oswald.variable,
    anton.variable,
    inter.variable,
    openSans.variable,
].join(" ");

/** Pile CSS de la police de titres selon le choix du back-office. */
export function headingFontStack(choice?: string | null): string {
    switch (choice) {
        case "bebas":
            return "var(--font-bebas), sans-serif";
        case "oswald":
            return "var(--font-oswald), sans-serif";
        case "anton":
            return "var(--font-anton), sans-serif";
        case "montserrat":
            return "var(--font-montserrat-loaded), Montserrat, sans-serif";
        case "futuretense":
        default:
            return "FutureTense, sans-serif";
    }
}

/** Pile CSS de la police du corps de texte selon le choix du back-office. */
export function bodyFontStack(choice?: string | null): string {
    switch (choice) {
        case "inter":
            return "var(--font-inter), sans-serif";
        case "opensans":
            return "var(--font-opensans), sans-serif";
        case "montserrat":
        default:
            return "var(--font-montserrat-loaded), Montserrat, sans-serif";
    }
}
