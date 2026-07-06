/**
 * Route dynamique à la racine du site. Sert :
 * - les Pages locales SEO (« salle-de-sport-nimes », …) — Contenu → Pages locales,
 * - les Pages libres (mentions légales, pages créées dans le back-office) — Contenu → Pages libres.
 */
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import SalleDeSportPage, { type CommuneData } from "@/components/local/salle-de-sport-page";
import PageStructure from "@/components/ui/page-structure";
import Blocs from "@/components/pages/blocs";
import { getBySlug, getCollection, getGlobal } from "@/lib/cms";
import { img, mediaUrl } from "@/lib/media";
import { RichText, richTextToPlainText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/vue_plateau_1.webp", width: 3024, height: 4032, alt: "Plateau de musculation HALL B" };

type Args = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const [locales, libres] = await Promise.all([
        getCollection("villes"),
        getCollection("pages", { sort: "titre" }),
    ]);
    return [
        ...locales.map((p) => ({ slug: p.slug })),
        ...libres.map((p) => ({ slug: p.slug })),
    ];
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params;

    const locale = await getBySlug("villes", slug);
    if (locale) {
        const titre = locale.seo?.titre || locale.h1;
        const description = locale.seo?.description || richTextToPlainText(locale.sousTitre);
        return {
            title: titre,
            description,
            alternates: { canonical: `${SITE_URL}/${locale.slug}` },
            robots: locale.seo?.noIndex ? { index: false, follow: false } : undefined,
            openGraph: { title: titre, description, url: `${SITE_URL}/${locale.slug}`, type: "website", siteName: "HALL B" },
        };
    }

    const page = await getBySlug("pages", slug);
    if (page) {
        const titre = page.seo?.titre || `HALL B - ${page.titre}`;
        const description = page.seo?.description || richTextToPlainText(page.sousTitre);
        const image = mediaUrl(page.seo?.image, SITE_URL);
        return {
            title: titre,
            description,
            alternates: { canonical: `${SITE_URL}/${page.slug}` },
            robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
            openGraph: {
                title: titre,
                description,
                url: `${SITE_URL}/${page.slug}`,
                type: "website",
                siteName: "HALL B",
                ...(image ? { images: [{ url: image }] } : {}),
            },
        };
    }

    return {};
}

export default async function Page({ params }: Args) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    /* 1. Page locale SEO ? */
    const locale = await getBySlug("villes", slug, draft);
    if (locale) {
        const [autres, communs, coordonnees] = await Promise.all([
            getCollection("villes", { draft }),
            getGlobal("pages-locales-communs", draft),
            getGlobal("coordonnees"),
        ]);

        const telephone = coordonnees?.telephone || "04 66 19 16 76";
        const adresseLigne = [
            coordonnees?.adresse?.rue || "1 chemin Azord",
            `${coordonnees?.adresse?.codePostal || "30980"} ${coordonnees?.adresse?.ville || "Saint-Dionisy"}`,
        ].join(", ");

        const data: CommuneData = {
            slug: locale.slug,
            ville: locale.ville,
            h1: locale.h1,
            subtitle: <RichText data={locale.sousTitre} />,
            intro: <RichText data={locale.intro} />,
            trajet: <RichText data={locale.trajet} />,
            faq: (locale.faq ?? []).map((f) => ({ question: f.question, reponse: f.reponse })),
            autres: autres
                .filter((a) => a.slug !== locale.slug)
                .map((a) => ({ slug: a.slug, linkLabel: a.linkLabel || a.ville })),
            telephone: {
                affichage: telephone,
                tel: `+33${telephone.replace(/\s/g, "").replace(/^0/, "")}`,
            },
            adresseLigne,
            mapSrc: `https://maps.google.com/maps?q=${encodeURIComponent(adresseLigne)}&z=13&hl=fr&output=embed`,
            image: img(communs?.image, IMAGE_DEFAUT) as ImageType,
            communs: {
                ctaTexte: communs?.ctaTexte || "Envie d'essayer ? Votre première séance est offerte.",
                ctaBoutonTexte: communs?.ctaBoutonTexte || "Je profite de l'essai offert",
                atouts: {
                    titre: communs?.atouts?.titre || "Pourquoi choisir HALL B ?",
                    liste: (communs?.atouts?.liste ?? []).map((a) => ({
                        icone: a.icone || "Sparkles",
                        titre: a.titre,
                        texte: a.texte,
                    })),
                },
                decouvrir: {
                    titre: communs?.decouvrir?.titre || "Découvrir HALL B",
                    liens: (communs?.decouvrir?.liens ?? []).map((l) => ({ label: l.label, url: l.url })),
                },
                autresVilles: {
                    titre: communs?.autresVilles?.titre || "HALL B, votre salle de sport dans tout le bassin nîmois",
                    texte: communs?.autresVilles?.texte || "Notre salle de Saint-Dionisy accueille aussi les sportifs de :",
                },
            },
        };

        return <SalleDeSportPage data={data} />;
    }

    /* 2. Page libre ? */
    const page = await getBySlug("pages", slug, draft);
    if (page) {
        const blocs = page.contenu ?? [];

        if (page.gabarit === "document") {
            return (
                <main className="text-foreground-base bg-background-base py-subMenu px-content lg:px-contentLg w-full break-words">
                    <h1>{page.titre}</h1>
                    <Blocs blocs={blocs} />
                </main>
            );
        }

        return (
            <PageStructure title={page.titre} subtitle={<RichText data={page.sousTitre} />}>
                <div className="w-full space-y-16">
                    <Blocs blocs={blocs} />
                </div>
            </PageStructure>
        );
    }

    notFound();
}
