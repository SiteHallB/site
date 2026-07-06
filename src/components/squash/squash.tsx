"use client"

import SportigoSquash from "@/components/ui/sportigo-squash";

import PageStructure from "@/components/ui/page-structure";
import type { ImageType } from "@/context/image-context";
import { getIcon } from "@/lib/icons";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export type SquashData = {
    titre: string;
    sousTitre: string;
    pointsCles: string[];
    image: ImageType;
    sectionSeo: { titre: string; contenu: React.ReactNode };
    benefices: { titre: string; liste: { icone: string; titre: string; texte: string }[] };
    infosPratiques: { titre: string; points: string[]; note: React.ReactNode };
    faq: { question: string; reponse: string }[];
};

export default function Squash({ data }: { data: SquashData }) {
    return (
        <PageStructure
            title={data.titre}
            subtitle={<p>{data.sousTitre}</p>}
        >
            {/* Réservation : offre + image + widget */}
            <div className="bg-background-highlight rounded-xl w-full p-1 flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center py-3 px-4 w-full space-y-4">
                    <ul className="text-foreground-subdued space-y-1">
                        {data.pointsCles.map((point, i) => (
                            <li key={i}><p>• {point}</p></li>
                        ))}
                    </ul>
                    <div className="max-w-100 aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                        <Image
                            {...data.image}
                            className="object-cover object-center size-full"
                        />
                    </div>
                </div>
                <SportigoSquash/>
            </div>

            {/* Le squash près de Nîmes */}
            {data.sectionSeo.titre && (
                <section className="w-full max-w-3xl text-foreground-subdued">
                    <h2 className="text-foreground-base mb-content">{data.sectionSeo.titre}</h2>
                    <div className="[&_p]:mb-content">{data.sectionSeo.contenu}</div>
                </section>
            )}

            {/* Pourquoi jouer au squash */}
            {data.benefices.liste.length > 0 && (
                <section className="w-full max-w-3xl">
                    <h2 className="text-foreground-base mb-content">{data.benefices.titre}</h2>
                    <div className="grid sm:grid-cols-2 gap-content">
                        {data.benefices.liste.map(({ icone, titre, texte }) => {
                            const Icon = getIcon(icone);
                            return (
                                <div key={titre} className="bg-background-subdued rounded-xl p-content flex flex-col space-y-2">
                                    <Icon className="size-7 text-accent" aria-hidden="true" />
                                    <h3 className="text-foreground-base font-semibold">{titre}</h3>
                                    <p className="text-foreground-subdued textSmall">{texte}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Infos pratiques */}
            {data.infosPratiques.points.length > 0 && (
                <section className="w-full max-w-3xl text-foreground-subdued">
                    <h2 className="text-foreground-base mb-content">{data.infosPratiques.titre}</h2>
                    <ul className="space-y-1">
                        {data.infosPratiques.points.map((point, i) => (
                            <li key={i}><p>• {point}</p></li>
                        ))}
                    </ul>
                    <div className="mt-content">{data.infosPratiques.note}</div>
                </section>
            )}

            {/* FAQ */}
            {data.faq.length > 0 && (
                <section className="w-full max-w-3xl">
                    <h2 className="text-foreground-base mb-content">Questions fréquentes</h2>
                    <div className="flex flex-col">
                        {data.faq.map(({ question, reponse }) => (
                            <details
                                key={question}
                                className="group border-b border-foreground-subdued/20 py-3"
                            >
                                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden text-foreground-base font-semibold flex justify-between items-center gap-4">
                                    <span>{question}</span>
                                    <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                                </summary>
                                <p className="mt-2 text-foreground-subdued">{reponse}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}
        </PageStructure>
    );
}
