/**
 * Page d'un cours, générée depuis le CMS (Contenu → Cours).
 */
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";

import CoursTemplate, { type IconName, type Stat } from "@/components/cours/cours-template";
import { getBySlug, getCollection, getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText, richTextToPlainText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/salle_coursco.webp", width: 3024, height: 4032, alt: "Salle de cours collectifs HALL B" };

type Args = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const cours = await getCollection("cours");
    return cours.filter((c) => c.pageActive !== false).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getBySlug("cours", slug);
    if (!doc) return {};

    const titre = doc.seo?.titre || `Cours de ${doc.titre} à Saint Dionisy (Nîmes, Gard) | HALL B`;
    const description = doc.seo?.description || richTextToPlainText(doc.heroLead);

    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/cours/${doc.slug}` },
        robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title: titre,
            description,
            url: `${SITE_URL}/cours/${doc.slug}`,
            type: "website",
            siteName: "HALL B",
        },
    };
}

export default async function Page({ params }: Args) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    const [doc, pageCours, coordonnees] = await Promise.all([
        getBySlug("cours", slug, draft),
        getGlobal("page-cours", draft),
        getGlobal("coordonnees"),
    ]);

    if (!doc || (doc.pageActive === false && !draft)) notFound();

    const image = img(doc.image, IMAGE_DEFAUT) as ImageType;
    const telephone = coordonnees?.telephone || "04 66 19 16 76";

    /* Données structurées Google : activité sportive + FAQ. */
    const schemaExercice = {
        "@context": "https://schema.org",
        "@type": "ExerciseAction",
        name: doc.schemaExercice?.nom || `Cours de ${doc.titre}`,
        description: doc.schemaExercice?.description || richTextToPlainText(doc.heroLead),
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
            telephone: `+33 ${telephone.replace(/^0/, "").trim()}`,
            url: SITE_URL,
        },
        exerciseType: doc.schemaExercice?.typeExercice || doc.titre,
        url: `${SITE_URL}/cours/${doc.slug}`,
    };

    const faq = doc.faq ?? [];
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

    const stats = (doc.stats ?? []).map((s) => ({ value: s.value, label: s.label }));
    /* Le bandeau attend exactement 4 chiffres clés : on complète si besoin. */
    while (stats.length < 4) stats.push({ value: "", label: "" });

    return (
        <>
            <Script
                id={`schema-course-${doc.slug}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaExercice) }}
            />
            {schemaFaq && (
                <Script
                    id={`schema-faq-${doc.slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
                />
            )}
            <CoursTemplate
                image={image}
                eyebrow={doc.eyebrow || "Cours collectif"}
                h1Top={doc.h1Top}
                h1Bottom={doc.h1Bottom || ""}
                heroLead={<RichText data={doc.heroLead} />}
                stats={stats.slice(0, 4) as [Stat, Stat, Stat, Stat]}
                whatTitle={doc.quoi?.titre || `Le ${doc.titre}, c'est quoi ?`}
                whatParagraph1={<RichText data={doc.quoi?.paragraphe1} />}
                whatParagraph2={<RichText data={doc.quoi?.paragraphe2} />}
                benefitsTitle={doc.benefices?.titre || `Pourquoi essayer le ${doc.titre}`}
                benefits={(doc.benefices?.liste ?? []).map((b) => ({
                    iconName: (b.icone ?? "Sparkles") as IconName,
                    title: b.titre,
                    text: b.texte,
                }))}
                steps={(doc.deroulement ?? []).map((s, i) => ({
                    n: String(i + 1).padStart(2, "0"),
                    title: s.titre,
                    text: s.texte,
                }))}
                audienceIntro={<RichText data={doc.public?.intro} />}
                audienceBullets={(doc.public?.points ?? []).map((p) => p.texte)}
                equipmentTitle={doc.equipement?.titre || "Une salle entièrement dédiée"}
                equipmentParagraph1={<RichText data={doc.equipement?.paragraphe1} />}
                equipmentParagraph2={<RichText data={doc.equipement?.paragraphe2} />}
                faq={faq.map((f) => ({ question: f.question, answer: <p>{f.reponse}</p> }))}
                localTitle={doc.zone?.titre || "À 15 min de Nîmes"}
                localText={<RichText data={doc.zone?.texte} />}
                secondaryCta={
                    doc.boutonSecondaire?.texte
                        ? { label: doc.boutonSecondaire.texte, path: doc.boutonSecondaire.url || "/plannings" }
                        : undefined
                }
                cta={{
                    titre: pageCours?.ctaCours?.titre || undefined,
                    texte: pageCours?.ctaCours?.texte ? <RichText data={pageCours.ctaCours.texte} /> : undefined,
                    boutonTexte: pageCours?.ctaCours?.boutonTexte || undefined,
                }}
                maillage={pageCours?.maillage?.map((l) => ({ label: l.label, url: l.url }))}
            />
        </>
    );
}
