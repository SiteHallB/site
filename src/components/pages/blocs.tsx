/**
 * Rendu des blocs des « Pages libres » du CMS, dans le style du site.
 */
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ChevronDown } from "lucide-react";

import Clickable from "@/components/ui/clickable";
import Separator from "@/components/ui/separator";
import { img } from "@/lib/media";
import { RichText } from "@/lib/richtext";
import type { Page } from "@/payload-types";

type Bloc = NonNullable<Page["contenu"]>[number];

function BlocRendu({ bloc }: { bloc: Bloc }) {
    switch (bloc.blockType) {
        case "texte":
            return (
                <section className="w-full max-w-3xl mx-auto text-foreground-subdued">
                    <RichText data={bloc.contenu} className="[&_p]:mb-content [&_h2]:text-foreground-base [&_h2]:mb-content [&_h3]:text-foreground-base [&_h3]:mb-contentClose" />
                </section>
            );

        case "markdown":
            return (
                <section className="w-full text-foreground-base break-words [&_a]:text-accent">
                    <ReactMarkdown>{bloc.contenu || ""}</ReactMarkdown>
                </section>
            );

        case "imageTexte": {
            const image = img(bloc.image);
            return (
                <section className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-content lg:gap-contentLg items-center">
                    <div className={`w-full lg:w-1/2 aspect-square rounded-xl overflow-hidden ${bloc.imageADroite ? "lg:order-2" : ""}`}>
                        {image && (
                            <Image {...image} className="object-cover object-center size-full" />
                        )}
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col space-y-content">
                        {bloc.titre && <h2 className="text-foreground-base">{bloc.titre}</h2>}
                        <Separator className="!my-2 max-w-20" />
                        <div className="text-foreground-subdued [&_p]:mb-content">
                            <RichText data={bloc.texte} />
                        </div>
                    </div>
                </section>
            );
        }

        case "cta":
            return (
                <section className="w-full max-w-3xl mx-auto bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                    {bloc.titre && <h2 className="text-foreground-base">{bloc.titre}</h2>}
                    <div className="text-foreground-subdued">
                        <RichText data={bloc.texte} />
                    </div>
                    {bloc.bouton?.texte && (
                        <Clickable
                            clickableType={{
                                type: "link",
                                path: bloc.bouton.url || "/",
                                outside: bloc.bouton.externe ?? false,
                            }}
                            style={{ variant: "page", color: (bloc.bouton.style ?? "accent") as "accent" | "primary" }}
                            className="max-w-xs"
                        >
                            {bloc.bouton.texte}
                        </Clickable>
                    )}
                </section>
            );

        case "faq":
            return (
                <section className="w-full max-w-3xl mx-auto">
                    {bloc.titre && (
                        <h2 className="text-foreground-base mb-subTitle text-center">{bloc.titre}</h2>
                    )}
                    <ul className="list-none space-y-3">
                        {(bloc.items ?? []).map((f) => (
                            <li key={f.question} className="bg-background-highlight rounded-xl">
                                <details className="group">
                                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-4 flex items-center justify-between gap-4 text-foreground-base font-semibold">
                                        {f.question}
                                        <ChevronDown className="text-accent size-5 shrink-0 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="px-4 pb-4 textSmall text-foreground-subdued">{f.reponse}</p>
                                </details>
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case "cartes":
            return (
                <section className="w-full max-w-6xl mx-auto flex flex-col items-center">
                    {bloc.titre && (
                        <h2 className="text-foreground-base mb-subTitle text-center">{bloc.titre}</h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-content w-full">
                        {(bloc.items ?? []).map((carte, i) => {
                            const image = img(carte.image);
                            const contenu = (
                                <div className="h-full flex flex-col bg-background-highlight rounded-xl border border-foreground-subdued/10 overflow-hidden hover:border-accent transition-colors">
                                    {image && (
                                        <div className="w-full aspect-video overflow-hidden">
                                            <Image {...image} className="object-cover object-center size-full" />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col gap-2">
                                        <h3 className="textSubH2 text-foreground-base">{carte.titre}</h3>
                                        {carte.texte && <p className="text-foreground-subdued textSmall">{carte.texte}</p>}
                                    </div>
                                </div>
                            );
                            return carte.url ? (
                                <Link key={i} href={carte.url} className="block h-full">
                                    {contenu}
                                </Link>
                            ) : (
                                <div key={i} className="h-full">{contenu}</div>
                            );
                        })}
                    </div>
                </section>
            );

        default:
            return null;
    }
}

export default function Blocs({ blocs }: { blocs: Bloc[] }) {
    return (
        <>
            {blocs.map((bloc, index) => (
                <BlocRendu key={index} bloc={bloc} />
            ))}
        </>
    );
}
