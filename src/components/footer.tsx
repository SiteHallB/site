"use client"

import Image from "next/image";

import Clickable from "@/components/ui/clickable";
import Reseaux from "@/components/reseaux";

import Separator from "@/components/ui/separator";
import { useLinks } from "@/context/link-context";

import GoogleReviews from "@/components/google-reviews";
import { useImage } from "@/context/image-context";
import { Email, PhoneNumber } from "./ui/contact-widget";

export default function Footer() {
    const { pannata, technogym, pallini, adresse } = useLinks();
    const { logo, pannataLogo, technogymLogo, palliniLogo } = useImage();

    return (
        <footer className="relative w-full bg-background-subdued pt-content flex flex-col items-center p-content lg:p-contentLg">
            {/* Avis */}
            <GoogleReviews/>

            <Separator/>

            {/* Marques */}
            <div className="z-10 flex w-full py-content space-x-content items-center justify-around">
                <Clickable
                    clickableType={{type: "link", path: pannata, outside: true}}
                    style={{}}
                    className="min-w-0 max-w-[250px] flex-1"
                >
                    <Image
                        {...pannataLogo}
                        className="w-full h-auto object-contain"
                    />
                    <span className="sr-only">Découvrir Pannata</span>
                </Clickable>
                <Clickable
                    clickableType={{type: "link", path: technogym, outside: true}}
                    style={{}}
                    className="min-w-0 max-w-[250px] flex-1"
                >
                    <Image
                        {...technogymLogo}
                        className="w-full h-auto object-contain"
                    />
                    <span className="sr-only">Découvrir Technogym</span>
                </Clickable>
                <Clickable
                    clickableType={{type: "link", path: pallini, outside: true}}
                    style={{}}
                    className="min-w-0 max-w-[250px] flex-1"
                >
                    <Image
                        {...palliniLogo}
                        className="w-full h-auto object-contain"
                    />
                    <span className="sr-only">Découvrir Pallini</span>
                </Clickable>
            </div>

            <Separator/>

            {/* Infos importantes */}
            <div className="z-10 w-full flex flex-col lg:flex-row justify-between pb-content lg:pb-contentLg gap-y-content">
                {/* Réseaux */}
                <Reseaux className="w-full"/>

                {/* Horaire */}
                <div className="lg:items-center w-full flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 mb-1 lg:mb-contentClose">Horaires</p>
                    <p className="text-foreground-subdued">
                        Tous les jours de 6h à 23h<br/>
                        Y compris le dimanche et les jours fériés
                    </p>
                    </div>
                </div>

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
                            1 Chem. d'Azord, 30980 Saint-Dionisy
                        </Clickable>
                        <Email className="w-fit"/>
                        <PhoneNumber className="w-fit"/>
                    </div>
                    </div>
                </div>
            </div>

            {/* Legal */}
            <div className="z-10 bg-background-base text-foreground-subdued flex flex-col gap-y-contentClose py-contentClose lg:flex-row w-full items-center justify-around">
                <Clickable
                    clickableType={{type: "link", path: ""}}
                    style={{variant: "legal"}}
                    className="w-fit"
                >
                    Mentions Légales
                </Clickable>

                {/* Politique de confidentialité */}
                <Clickable
                    clickableType={{type: "link", path: "/politique-confidentialite"}}
                    style={{variant: "legal"}}
                    className="w-fit"
                >
                    Politique de confidentialité
                </Clickable>

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
                    {...logo}
                    className="max-h-full max-w-full opacity-10"
                />
            </div>
        </footer>
    );
}