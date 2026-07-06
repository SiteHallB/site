import Link from "next/link";
import { Car, Navigation } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import { getIcon } from "@/lib/icons";

export type CommentVenirData = {
    titre: string;
    sousTitre: string;
    infos: { icone: string; titre: string; texte: string }[];
    telephone: string;
    boutonItineraireTexte: string;
    lienItineraire: string;
    mapSrc: string;
    itineraires: { titre: string; liste: { ville: string; temps: string; description: string }[] };
    communes: { slug: string; linkLabel: string }[];
    ctaTexte: string;
    ctaBoutonTexte: string;
};

export default function CommentVenir({ data }: { data: CommentVenirData }) {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hallb.fr/" },
            { "@type": "ListItem", position: 2, name: data.titre, item: "https://www.hallb.fr/comment-venir" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <PageStructure
                title={data.titre}
                subtitle={<p>{data.sousTitre}</p>}
            >
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* Coordonnées + carte */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-5">
                            {data.infos.map((info, i) => {
                                const Icon = getIcon(info.icone);
                                const isPhone = info.icone === "Phone";
                                return (
                                    <div key={i} className="flex items-start gap-3">
                                        <Icon className="text-accent size-7 shrink-0" />
                                        <div>
                                            <p className="text-foreground-base font-semibold">{info.titre}</p>
                                            {isPhone ? (
                                                <a href={`tel:${data.telephone}`} className="text-accent hoverUnderline">
                                                    {info.texte}
                                                </a>
                                            ) : (
                                                <p>{info.texte}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <a
                                href={data.lienItineraire}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="clickableBase hoverAccent text-background-subdued bg-accent rounded-full px-4 py-2 textLead flexCenter gap-2 mt-2 w-fit"
                            >
                                <Navigation className="size-5" />
                                {data.boutonItineraireTexte}
                            </a>
                        </div>

                        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-80 rounded-xl overflow-hidden">
                            <iframe
                                title="Localisation de HALL B à Saint-Dionisy"
                                src={data.mapSrc}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </section>

                    {/* En voiture */}
                    <section>
                        <h2 className="text-foreground-base mb-subTitle flex items-center gap-2">
                            <Car className="text-accent size-7 shrink-0" />
                            {data.itineraires.titre}
                        </h2>
                        <ul className="list-none space-y-3">
                            {data.itineraires.liste.map((r) => (
                                <li
                                    key={r.ville}
                                    className="bg-background-highlight rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                                >
                                    <div>
                                        <p className="text-foreground-base font-semibold">{r.ville}</p>
                                        <p className="textSmall">{r.description}</p>
                                    </div>
                                    <span className="text-accent font-semibold shrink-0">{r.temps}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Pages par ville */}
                    {data.communes.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-foreground-base mb-content">Vous venez d&apos;une ville voisine&nbsp;?</h2>
                            <p className="mb-content">
                                Retrouvez toutes les infos d&apos;accès et nos atouts pour votre commune&nbsp;:
                            </p>
                            <nav
                                aria-label="Pages salle de sport par ville"
                                className="flex flex-wrap justify-center gap-3"
                            >
                                {data.communes.map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={`/${c.slug}`}
                                        className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                    >
                                        {c.linkLabel}
                                    </Link>
                                ))}
                            </nav>
                        </section>
                    )}

                    {/* CTA */}
                    <section className="bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                        <p className="textLead text-foreground-base">
                            {data.ctaTexte}
                        </p>
                        <Clickable
                            clickableType={{ type: "link", path: "/essai-offert" }}
                            style={{ variant: "page", color: "accent" }}
                            className="flexCenter gap-2 max-w-xs"
                        >
                            {data.ctaBoutonTexte}
                        </Clickable>
                    </section>
                </div>
            </PageStructure>
        </>
    );
}
