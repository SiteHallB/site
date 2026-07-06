import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";

export type FaqData = {
    titre: string;
    sousTitre: string;
    items: { question: string; reponse: string }[];
    liens: { label: string; url: string }[];
    ctaTexte: string;
    ctaBoutonTexte: string;
};

export default function Faq({ data }: { data: FaqData }) {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hallb.fr/" },
            { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.hallb.fr/faq" },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.items.map((f) => ({
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />

            <PageStructure
                title={data.titre}
                subtitle={<p>{data.sousTitre}</p>}
            >
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* FAQ accordéon */}
                    <section>
                        <ul className="list-none space-y-3">
                            {data.items.map((f) => (
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

                    {/* Liens utiles */}
                    {data.liens.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-foreground-base mb-subTitle">Pour aller plus loin</h2>
                            <nav aria-label="Liens utiles" className="flex flex-wrap justify-center gap-3">
                                {data.liens.map((l) => (
                                    <Link
                                        key={l.url}
                                        href={l.url}
                                        className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                    >
                                        {l.label}
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
