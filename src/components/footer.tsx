"use client"

import Image from "next/image";

import Clickable from "@/components/ui/clickable";
import { Facebook, Instagram, Star as St } from "lucide-react";

function Star() {
    return (
        <St
            size={24}
            strokeWidth={2}
            className="text-background-highlight"
            fill="#E1C340"
        />
    );
}

function Avis({ text, autheur }: { text: string; autheur: string }) {
    return (
        <div className="w-full flex flex-col p-contentClose rounded outline-background-highlight outline-3">
            {/* Note */}
            <div className="flex flex-row mb-contentClose">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
            </div>
            {/* Citation */}
            <blockquote className="text-foreground-base">
                {text}
            </blockquote>
            <cite className="text-foreground-subdued">{autheur}, <em>avis Google</em></cite>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-background-subdued pt-content">
            {/* Avis */}
            <div className="w-full px-content flex flex-col items-center space-y-content">
                <h2 className="text-foreground-base text-center">Aide nous : Donne ton avis</h2>
                <Avis
                    autheur="Eliot Collombet"
                    text="Tout simplement la meilleure salle de sport que j'aie jamais vu. Encadrement, matériel, surface, ambiance, tout y est."/>
                <Avis
                    autheur="Gauthier Bonhomme"
                    text="J'ai visité la salle en juillet, la surface est juste dingue et le matériel est d'excellente qualité"/>
                <Clickable
                    clickableType={{type: "link", path: "https://www.google.com/search?rlz=1C1UEAD_frFR970FR970&hl=fr-FR&biw=1707&bih=825&q=HALL%20B%20Avis&ludocid=7212151405417539940&ibp=gwp%3B0%2C7&sa=X&ved=0CB4Q9fQKKABqFwoTCKDhpeH72o4DFQAAAAAdAAAAABAF#lkt=LocalPoiReviews&lpg=cid:CgIgAQ%3D%3D"}}
                    style={{"variant": "action", "color": "accent"}}
                    className="lg:w-fit w-full"
                >
                    Je donne mon avis
                </Clickable>
            </div>

            <hr className="border-t border-foreground-base my-content mx-content"/>

            {/* Marques */}
            <div className="flex w-full py-content px-content space-x-content items-center justify-around">
                <a href="https://www.panattasport.com/fr/" className="min-w-0 max-w-[250px] flex-1">
                <Image
                    src="/images/pannata.png"
                    alt=""
                    width={272}
                    height={109}
                    className="w-full h-auto object-contain"
                />
                </a>
                <a href="https://www.technogym.com/fr-FR/" className="min-w-0 max-w-[250px] flex-1">
                <Image
                    src="/images/technogym.png"
                    alt=""
                    width={820}
                    height={231}
                    className="w-full h-auto object-contain"
                />
                </a>
                <a href="https://www.pallini-sport.fr/" className="min-w-0 max-w-[250px] flex-1">
                <Image
                    src="/images/pallini.png"
                    alt=""
                    width={1633}
                    height={396}
                    className="w-full h-auto object-contain"
                />
                </a>
            </div>

            <hr className="border-t border-foreground-base my-content mx-content"/>

            {/* Réseaux */}
            <div className="w-full justify-center flex flex-row space-x-content">
                <Clickable
                    clickableType={{type: "link", path: "https://www.instagram.com/hallb.fr/"}}
                    style={{variant: "menuSideButton"}}
                    className="flex flex-row space-x-1"
                >
                    <Instagram/>
                    <p>Instagram</p>
                </Clickable>
                <Clickable
                    clickableType={{type: "link", path: "https://www.instagram.com/hallb.fr/"}}
                    style={{variant: "menuSideButton"}}
                    className="flex flex-row space-x-1"
                >
                    <Facebook/>
                    <p>Facebook</p>
                </Clickable>
            </div>

            <hr className="border-t border-foreground-base my-content mx-content"/>

            {/* Legal */}
            <div className="text-foreground-subdued flex flex-col w-full pb-content space-y-content">
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Mentions Légales
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Politique de confidentialité
                </Clickable>
                <Clickable
                    clickableType={{type: "link", onClick: () => 0, path: ""}}
                    style={{variant: "legal"}}
                >
                    Gérer vos cookies
                </Clickable>
            </div>
        </footer>
    );
}