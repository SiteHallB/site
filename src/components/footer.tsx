"use client"

import Image from "next/image";

import Clickable from "@/components/ui/clickable";
import Reseaux from "@/components/reseaux";

import Separator from "@/components/ui/separator";
import { useLinks } from "@/context/link-context";
import type { ImageType } from "@/context/image-context";

import GoogleReviews, { type Temoignage } from "@/components/google-reviews";
import { Email, PhoneNumber } from "./ui/contact-widget";
import Horaires from "./horaires";

export type FooterData = {
    logo: ImageType;
    partenaires: { nom: string; url: string; logo: ImageType }[];
    adresseAffichage: string;
    liensLegaux: { label: string; url: string }[];
    avis: { source: "google" | "manuel"; temoignages: Temoignage[] };
};

export default function Footer({ data }: { data: FooterData }) {
    const { adresse } = useLinks();

    return (
        <footer className="relative w-full bg-background-subdued pt-content flex flex-col items-center p-content lg:p-contentLg">
            {/* Avis */}
            <GoogleReviews source={data.avis.source} temoignages={data.avis.temoignages}/>

            <Separator/>

            {/* Marques */}
            <div className="z-10 flex w-full py-content space-x-content items-center justify-around">
                {data.partenaires.map((partenaire, index) => (
                    <Clickable
                        key={index}
                        clickableType={{type: "link", path: partenaire.url, outside: true}}
                        style={{}}
                        className="min-w-0 max-w-[250px] flex-1"
                    >
                        <Image
                            {...partenaire.logo}
                            className="w-full h-auto object-contain"
                        />
                        <span className="sr-only">Découvrir {partenaire.nom}</span>
                    </Clickable>
                ))}
            </div>

            <Separator/>

            {/* Infos importantes */}
            <div className="z-10 w-full flex flex-col lg:flex-row justify-between pb-content lg:pb-contentLg gap-y-content">
                {/* Réseaux */}
                <Reseaux className="w-full"/>

                {/* Horaires */}
                <Horaires/>

                {/* Ou nous trouver ? */}
                <div className="lg:items-center w-full flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Où nous trouver ?</p>
                    <div className="text-foreground-subdued flex flex-col">
                        <Clickable
                            clickableType={{type: "link", path: adresse, outside: true}}
                            style={{}}
                            className="hoverUnderline textNormal text-foreground-subdued w-fit"
                        >
                            {data.adresseAffichage}
                        </Clickable>
                        <Email className="w-fit"/>
                        <PhoneNumber className="w-fit"/>
                        <Clickable
                            clickableType={{type: "link", path: "/comment-venir"}}
                            style={{}}
                            className="hoverUnderline textNormal text-accent w-fit mt-1"
                        >
                            Comment venir ?
                        </Clickable>
                    </div>
                    </div>
                </div>
            </div>

            {/* Legal */}
            <div className="z-10 bg-background-base text-foreground-subdued flex flex-col gap-y-contentClose py-contentClose lg:flex-row w-full items-center justify-around">
                {data.liensLegaux.map((lien, index) => (
                    <Clickable
                        key={index}
                        clickableType={{type: "link", path: lien.url}}
                        style={{variant: "legal"}}
                        className="w-fit"
                    >
                        {lien.label}
                    </Clickable>
                ))}

                {/* Cookies */}
                <Clickable
                    clickableType={{type: "button", onClick: () => window.klaro?.show()}}
                    style={{variant: "legal"}}
                    className="w-fit"
                >
                    Gérer mes cookies
                </Clickable>
            </div>

            {/* Hall b en fond */}
            <div className="absolute inset-0 overflow-hidden flexCenter p-contentClose lg:p-content">
                <Image
                    {...data.logo}
                    className="max-h-full max-w-full h-auto  opacity-10"
                />
            </div>
        </footer>
    );
}
