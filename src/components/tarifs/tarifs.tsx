"use client"

import { ChevronRight } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import FormuleOverview from "@/components/tarifs/formule-overview"
import Separator from "@/components/ui/separator";
import Clickable from "@/components/ui/clickable";

import type { ImageType } from "@/context/image-context";

export type CarteFormule = {
    titre: string;
    sousTitre: string;
    prix: React.ReactNode;
    images: ImageType[];
    checks: React.ReactNode[];
    plus: React.ReactNode[];
    actionLink: string;
};

export type TarifsData = {
    titre: string;
    sousTitre: React.ReactNode;
    lienSquash: { texte: string; url: string };
    principales: CarteFormule[];
    autres: CarteFormule[];
    cadeau?: CarteFormule;
    texteSeo: { titre: string; contenu: React.ReactNode };
};

function Carte({ formule }: { formule: CarteFormule }) {
    return (
        <FormuleOverview
            title={formule.titre}
            subtitle={formule.sousTitre}
            prix={formule.prix}
            images={formule.images}
            checkDescription={formule.checks}
            plusDescription={formule.plus}
            actionLink={formule.actionLink}
        />
    );
}

export default function Tarifs({ data }: { data: TarifsData }) {
    return (
        <PageStructure title={data.titre} subtitle={data.sousTitre}>
            <div className="w-full pt-1 flexCenter flex-col">
                {/* Lien squash */}
                {data.lienSquash.texte && (
                    <Clickable
                        clickableType={{type: "link", path: data.lienSquash.url}}
                        style={{variant: "menuMainButton"}}
                        className="mb-subSection flexCenter flex-row"
                    >
                        {data.lienSquash.texte}
                        <ChevronRight className="size-4 lg:size-6"/>
                    </Clickable>
                )}

                {/* Formules principales */}
                <ul className="list-none w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {data.principales.map((formule, index) => (
                        <li key={index} className="w-full max-w-90">
                            <Carte formule={formule}/>
                        </li>
                    ))}
                </ul>

                <Separator/>

                {/* Autres formules */}
                <ul className="mt-content w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {data.autres.map((formule, index) => (
                        <li key={index} className="w-full max-w-90">
                            <Carte formule={formule}/>
                        </li>
                    ))}
                </ul>

                {/* Carte cadeau */}
                {data.cadeau && (
                    <>
                        <Separator/>
                        <FormuleOverview
                            title={data.cadeau.titre}
                            subtitle={data.cadeau.sousTitre}
                            prix={data.cadeau.prix}
                            images={data.cadeau.images}
                            checkDescription={data.cadeau.checks}
                            plusDescription={data.cadeau.plus}
                            actionLink={data.cadeau.actionLink}
                            className="mt-content"
                        />
                    </>
                )}

                {/* Contenu SEO */}
                {data.texteSeo.titre && (
                    <>
                        <Separator/>
                        <section className="w-full max-w-3xl mt-content text-foreground-subdued text-left">
                            <h2 className="text-foreground-base mb-content">{data.texteSeo.titre}</h2>
                            <div className="[&_p]:mb-content">{data.texteSeo.contenu}</div>
                        </section>
                    </>
                )}
            </div>
        </PageStructure>
    );
}
