import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, MapPin, Phone } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import type { ImageType } from "@/context/image-context";
import { getIcon } from "@/lib/icons";

export type CommuneData = {
    slug: string;
    ville: string;
    h1: string;
    subtitle: React.ReactNode;
    intro: React.ReactNode;
    trajet: React.ReactNode;
    faq: { question: string; reponse: string }[];
    autres: { slug: string; linkLabel: string }[];
    telephone: { affichage: string; tel: string };
    adresseLigne: string;
    mapSrc: string;
    image: ImageType;
    communs: {
        ctaTexte: string;
        ctaBoutonTexte: string;
        atouts: { titre: string; liste: { icone: string; titre: string; texte: string }[] };
        decouvrir: { titre: string; liens: { label: string; url: string }[] };
        autresVilles: { titre: string; texte: string };
    };
};

export default function SalleDeSportPage({ data }: { data: CommuneData }) {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://www.hallb.fr/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: data.h1,
                item: `https://www.hallb.fr/${data.slug}`,
            },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.reponse },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            {data.faq.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
                />
            )}

            <PageStructure title={data.h1} subtitle={data.subtitle}>
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* Intro + image */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="[&_p]:mb-content [&_p:last-child]:mb-0">{data.intro}</div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                            <Image
                                {...data.image}
                                alt={data.image.alt || `Plateau de musculation de HALL B, salle de sport près de ${data.ville}`}
                                className="object-cover object-center size-full"
                            />
                        </div>
                    </section>

                    {/* CTA principal */}
                    <section className="bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                        <p className="textLead text-foreground-base">
                            {data.communs.ctaTexte}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Clickable
                                clickableType={{ type: "link", path: "/essai-offert" }}
                                style={{ variant: "page", color: "accent" }}
                                className="flexCenter gap-2"
                            >
                                <MapPin className="size-5" />
                                {data.communs.ctaBoutonTexte}
                            </Clickable>
                            <a
                                href={`tel:${data.telephone.tel}`}
                                className="clickableBase hoverPrimary text-foreground-base outline-[2px] outline-offset-[-2px] outline-foreground-base rounded-full px-4 py-2 textLead flexCenter gap-2"
                            >
                                <Phone className="size-5" />
                                {data.telephone.affichage}
                            </a>
                        </div>
                    </section>

                    {/* Comment venir + carte */}
                    <section>
                        <h2 className="text-foreground-base mb-content flex items-center gap-2">
                            <MapPin className="text-accent size-7 shrink-0" />
                            Comment venir depuis {data.ville}
                        </h2>
                        <div className="mb-content">{data.trajet}</div>
                        <div className="aspect-video rounded-xl overflow-hidden">
                            <iframe
                                title={`Itinéraire vers HALL B depuis ${data.ville}`}
                                src={data.mapSrc}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                        <p className="textSmall mt-4">
                            HALL B — {data.adresseLigne}.{" "}
                            <Link href="/comment-venir" className="text-accent hoverUnderline">
                                Voir tous les itinéraires et horaires
                            </Link>
                            .
                        </p>
                    </section>

                    {/* Différenciateurs */}
                    {data.communs.atouts.liste.length > 0 && (
                        <section>
                            <h2 className="text-foreground-base mb-subTitle text-center">
                                {data.communs.atouts.titre}
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                                {data.communs.atouts.liste.map((f) => {
                                    const Icon = getIcon(f.icone);
                                    return (
                                        <li
                                            key={f.titre}
                                            className="bg-background-highlight rounded-xl p-6 flex flex-col gap-2"
                                        >
                                            <Icon className="text-accent size-8" />
                                            <p className="text-foreground-base font-semibold">{f.titre}</p>
                                            <p className="textSmall">{f.texte}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}

                    {/* Liens activités */}
                    {data.communs.decouvrir.liens.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-foreground-base mb-subTitle">{data.communs.decouvrir.titre}</h2>
                            <div className="flex flex-wrap justify-center gap-3">
                                {data.communs.decouvrir.liens.map((l) => (
                                    <Clickable
                                        key={l.url}
                                        clickableType={{ type: "link", path: l.url }}
                                        style={{ variant: "navigationBar", color: "primary" }}
                                        className="flexCenter gap-1"
                                    >
                                        {l.label}
                                        <ChevronRight className="size-4" />
                                    </Clickable>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* FAQ */}
                    {data.faq.length > 0 && (
                        <section>
                            <h2 className="text-foreground-base mb-subTitle text-center">Questions fréquentes</h2>
                            <ul className="list-none space-y-3">
                                {data.faq.map((f) => (
                                    <li key={f.question} className="bg-background-highlight rounded-xl">
                                        <details className="group">
                                            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-4 flex items-center justify-between gap-4 text-foreground-base font-semibold">
                                                {f.question}
                                                <ChevronDown className="text-accent size-5 shrink-0 transition-transform group-open:rotate-180" />
                                            </summary>
                                            <p className="px-4 pb-4 textSmall">{f.reponse}</p>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Autres villes */}
                    {data.autres.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-foreground-base mb-content">
                                {data.communs.autresVilles.titre}
                            </h2>
                            <p className="mb-content">
                                {data.communs.autresVilles.texte}
                            </p>
                            <nav
                                aria-label="Autres villes desservies par HALL B"
                                className="flex flex-wrap justify-center gap-3"
                            >
                                {data.autres.map((o) => (
                                    <Link
                                        key={o.slug}
                                        href={`/${o.slug}`}
                                        className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                    >
                                        {o.linkLabel}
                                    </Link>
                                ))}
                            </nav>
                        </section>
                    )}
                </div>
            </PageStructure>
        </>
    );
}
