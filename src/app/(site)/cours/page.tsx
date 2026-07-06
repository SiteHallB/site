/**
 * Page « Nos cours » : textes gérés dans Pages → Page Nos cours,
 * grille des disciplines générée depuis Contenu → Cours.
 */
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Script from "next/script";

import CoursIndex, { type CoursIndexData } from "@/components/cours/cours-index";
import { getCollection, getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/salle_coursco.webp", width: 3024, height: 4032, alt: "Salle de cours collectifs HALL B" };

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-cours");
    const titre = page?.seo?.titre || "Cours collectifs à Saint Dionisy (Nîmes, Gard) | HALL B";
    const description =
        page?.seo?.description ||
        "Cours collectifs HALL B près de Nîmes : RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates et cours d'aqua. Inclus dans la formule Boost.";
    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/cours` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/cours`, type: "website", siteName: "HALL B" },
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const [page, cours] = await Promise.all([
        getGlobal("page-cours", draft),
        getCollection("cours", { draft }),
    ]);

    const disciplines = cours.map((c) => ({
        name: c.titre,
        short: c.carte?.resume || "",
        icone: c.carte?.icone || "Activity",
        href: c.pageActive !== false ? `/cours/${c.slug}` : undefined,
        intensite: c.carte?.intensite || "Élevée",
        duree: c.carte?.duree || "45 min",
        accentColor: c.carte?.themeBleu ? ("blue" as const) : undefined,
    }));

    const schemaListe = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cours collectifs HALL B",
        description: "Tous les cours collectifs proposés à la salle HALL B, à 15 minutes de Nîmes.",
        itemListElement: cours
            .filter((c) => c.pageActive !== false)
            .map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.titre,
                url: `${SITE_URL}/cours/${c.slug}`,
            })),
    };

    const data: CoursIndexData = {
        hero: {
            eyebrow: page?.hero?.eyebrow || "Tous nos cours",
            h1Top: page?.hero?.h1Top || "Cours collectifs",
            h1Bottom: page?.hero?.h1Bottom || "à Saint Dionisy",
            texte:
                page?.hero?.texte ||
                "Plus de 10 disciplines, des dizaines de séances chaque semaine. À 15 minutes de Nîmes, dans le Gard, encadrées par des coachs diplômés.",
            image: img(page?.hero?.image, IMAGE_DEFAUT) as ImageType,
        },
        blocsFormules: (page?.blocsFormules ?? []).map((b) => ({
            eyebrow: b.eyebrow || "",
            titre: b.titre,
            texte: <RichText data={b.texte} />,
            couleur: (b.couleur ?? "accent") as "accent" | "bleu",
            icone: b.icone || "Sparkles",
            boutons: (b.boutons ?? []).map((bt) => ({
                texte: bt.texte,
                url: bt.url,
                style: (bt.style ?? "accent") as "primary" | "accent",
            })),
        })),
        catalogue: {
            eyebrow: page?.catalogue?.eyebrow || "Le catalogue",
            titre: page?.catalogue?.titre || "Nos disciplines",
            texte:
                page?.catalogue?.texte ||
                "Du cardio brûle-graisses aux séances bien-être en passant par le renforcement musculaire — choisissez ce qui vous correspond.",
        },
        disciplines,
        argumentsSection: {
            titre: page?.arguments?.titre || "Pourquoi nos cours collectifs ?",
            liste: (page?.arguments?.liste ?? []).map((a) => ({ titre: a.titre, texte: a.texte })),
        },
        planningCta: {
            titre: page?.planningCta?.titre || "Quand viennent les cours ?",
            texte:
                page?.planningCta?.texte ||
                "Plusieurs séances chaque jour, du lundi au dimanche. Matin, midi et soir. Consultez le planning complet pour trouver le créneau qui vous convient.",
            bouton: {
                texte: page?.planningCta?.bouton?.texte || "Voir le planning complet",
                url: page?.planningCta?.bouton?.url || "/plannings",
                style: (page?.planningCta?.bouton?.style ?? "accent") as "primary" | "accent",
            },
        },
        ctaFinal: {
            titre: page?.ctaFinal?.titre || "Envie d'essayer ?",
            texte: <RichText data={page?.ctaFinal?.texte} />,
            boutons: (page?.ctaFinal?.boutons ?? []).map((bt) => ({
                texte: bt.texte,
                url: bt.url,
                style: (bt.style ?? "accent") as "primary" | "accent",
            })),
        },
    };

    return (
        <>
            <Script
                id="schema-cours-itemlist"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaListe) }}
            />
            <CoursIndex data={data} />
        </>
    );
}
