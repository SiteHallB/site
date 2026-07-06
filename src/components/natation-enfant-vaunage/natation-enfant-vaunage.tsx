"use client";

import PageStructure from "@/components/ui/page-structure";

import { PhoneNumber } from "@/components/ui/contact-widget";
import Clickable from "@/components/ui/clickable";
import type { ImageType } from "@/context/image-context";
import { getIcon } from "@/lib/icons";
import Image from "next/image";

export type NatationData = {
    titre: string;
    sousTitre: string;
    intro: string;
    offres: { icone: string; texte: React.ReactNode }[];
    bouton: { texte: string; url: string };
    horaires: { titre: string; lignes: string[] };
    image: ImageType;
};

export default function NatationEnfantVaunage({ data }: { data: NatationData }) {
    return (
        <PageStructure title={data.titre} subtitle={<p>{data.sousTitre}</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-4 flex-col">
                <p className="my-2">{data.intro}</p>
                {data.offres.map((offre, index) => {
                    const Icon = getIcon(offre.icone);
                    return (
                        <div key={index} className="flex flex-row items-start justify-start">
                            <Icon className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                            <div>{offre.texte}</div>
                        </div>
                    );
                })}

                <div className="my-8 flex flex-col h-full justify-center items-center space-y-4">
                    <PhoneNumber/>
                    <Clickable
                        clickableType={{type: "link", path: data.bouton.url}}
                        style={{variant: "navigationBar", color: "accent"}}
                    >
                        {data.bouton.texte}
                    </Clickable>
                </div>

                <div className="my-8 flex flex-col items-center h-full">
                    <p><strong>{data.horaires.titre}</strong></p>
                    <ul>
                        {data.horaires.lignes.map((ligne, index) => (
                            <li key={index}><p>{ligne}</p></li>
                        ))}
                    </ul>
                </div>

                <div className="max-w-100 aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                    <Image
                        {...data.image}
                        className="object-cover object-center size-full"
                    />
                </div>
            </div>
        </PageStructure>
    );
}
