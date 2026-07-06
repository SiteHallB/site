/** Page Squash : textes gérés dans Pages → Page Squash. */
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Script from "next/script";

import Squash, { type SquashData } from "@/components/squash/squash";
import { getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText, richTextToPlainText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/squash.webp", width: 3024, height: 4032, alt: "Terrain de squash HALL B" };

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-squash");
    const titre = page?.seo?.titre || "Squash à Saint Dionisy (Nîmes, Gard) | HALL B";
    const description =
        page?.seo?.description ||
        "Réservez en ligne l'un des deux terrains de squash de HALL B, à 15 min de Nîmes (Gard). Location de raquettes sur place, tournois réguliers. Tous niveaux.";
    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/squash` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/squash`, type: "website", siteName: "HALL B" },
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const [page, coordonnees] = await Promise.all([
        getGlobal("page-squash", draft),
        getGlobal("coordonnees"),
    ]);

    const faq = (page?.faq ?? []).map((f) => ({ question: f.question, reponse: f.reponse }));

    const schemaSquash = {
        "@context": "https://schema.org",
        "@type": "ExerciseAction",
        name: "Squash à HALL B",
        description: page?.sousTitre || richTextToPlainText(page?.sectionSeo?.contenu),
        location: {
            "@type": "HealthClub",
            name: "HALL B",
            address: {
                "@type": "PostalAddress",
                streetAddress: coordonnees?.adresse?.rue || "1 chemin Azord",
                addressLocality: coordonnees?.adresse?.ville || "Saint Dionisy",
                postalCode: coordonnees?.adresse?.codePostal || "30980",
                addressCountry: "FR",
            },
            telephone: `+33 ${(coordonnees?.telephone || "04 66 19 16 76").replace(/^0/, "").trim()}`,
            url: SITE_URL,
        },
        exerciseType: "Squash",
        url: `${SITE_URL}/squash`,
    };

    const schemaFaq =
        faq.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faq.map((f) => ({
                      "@type": "Question",
                      name: f.question,
                      acceptedAnswer: { "@type": "Answer", text: f.reponse },
                  })),
              }
            : null;

    const data: SquashData = {
        titre: page?.titre || "Réservation Squash",
        sousTitre:
            page?.sousTitre ||
            "Envie de vous défouler ou de partager un bon moment entre amis ? Nos deux terrains de squash vous attendent chez HALL B à Saint-Dionisy, à 15 minutes de Nîmes.",
        pointsCles: (page?.pointsCles ?? []).map((p) => p.texte),
        image: img(page?.image, IMAGE_DEFAUT) as ImageType,
        sectionSeo: {
            titre: page?.sectionSeo?.titre || "",
            contenu: <RichText data={page?.sectionSeo?.contenu} />,
        },
        benefices: {
            titre: page?.benefices?.titre || "Pourquoi jouer au squash ?",
            liste: (page?.benefices?.liste ?? []).map((b) => ({
                icone: b.icone || "Sparkles",
                titre: b.titre,
                texte: b.texte,
            })),
        },
        infosPratiques: {
            titre: page?.infosPratiques?.titre || "Infos pratiques",
            points: (page?.infosPratiques?.points ?? []).map((p) => p.texte),
            note: <RichText data={page?.infosPratiques?.note} />,
        },
        faq,
    };

    return (
        <>
            <Script
                id="schema-squash"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSquash) }}
            />
            {schemaFaq && (
                <Script
                    id="schema-faq-squash"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
                />
            )}
            <Squash data={data} />
        </>
    );
}
