"use client"

import Image from "next/image";

import Clickable from "@/components/ui/clickable";
import { Facebook, Instagram, Star as St } from "lucide-react";
import Reseaux from "@/components/reseaux";

function Separator() {
    return (
        <hr className="z-10 border-t border-foreground-base my-content lg:my-contentLg w-full max-w-200"/>
    );
}

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
            <blockquote className="text-foreground-base textNormal">
                {text}
            </blockquote>
            <cite className="text-foreground-subdued textSmall">{autheur}, <em>avis Google</em></cite>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative w-full bg-background-subdued pt-content flex flex-col items-center p-content lg:p-contentLg">
            {/* Avis */}
            <div className="z-10 w-full flex flex-col items-center space-y-content">
                <h2 className="text-foreground-base text-center">Aide nous : Donne ton avis</h2>
                <Avis
                    autheur="Eliot Collombet"
                    text="Tout simplement la meilleure salle de sport que j'aie jamais vu. Encadrement, matériel, surface, ambiance, tout y est."/>
                <Avis
                    autheur="Gauthier Bonhomme"
                    text="J'ai visité la salle en juillet, la surface est juste dingue et le matériel est d'excellente qualité"/>
                <Clickable
                    clickableType={{type: "link", path: "https://maps.app.goo.gl/L9UnaRBpBe8vECyD9"}}
                    style={{"variant": "action", "color": "accent"}}
                    className="lg:w-fit w-full"
                >
                    Je donne mon avis
                </Clickable>
            </div>

            <Separator/>

            {/* Marques */}
            <div className="z-10 flex w-full py-content space-x-content items-center justify-around">
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

            <Separator/>

            {/* Infos importantes */}
            <div className="z-10 w-full flex flex-col lg:flex-row justify-between pb-content lg:pb-contentLg gap-y-content">
                {/* Réseaux */}
                <Reseaux/>

                {/* Horraire */}
                <div className="lg:items-center w-full flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 lg:mb-contentClose">Horraires</p>
                    <p className="text-foreground-subdued">
                        Tous les jours de 6h à 23h<br/>
                        Y compris le Dimanche et jours fériés
                    </p>
                    </div>
                </div>

                {/* Ou nous trouver ? */}
                <div className="lg:items-center w-full flex flex-col">
                    <div>
                    <p className="text-foreground-base textSubH2 lg:mb-contentClose">Ou nous trouver ?</p>
                    <p className="text-foreground-subdued">
                        1 Chem. d'Azord, 30980 Saint-Dionisy<br/>
                        hallb@contact.fr<br/>
                        0600000000
                    </p>
                    </div>
                </div>
            </div>

            {/* Legal */}
            <div className="z-10 bg-background-base text-foreground-subdued flex flex-col gap-y-contentClose py-contentClose lg:flex-row w-full justify-around">
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

            {/* Hall b en fond */}
            <div className="absolute inset-0 overflow-hidden flexCenter p-contentClose lg:p-content">
                <Image
                    src="/images/logo-hallb.png"
                    alt="Logo Hall B"
                    width={1240}
                    height={1328}
                    className="max-h-full max-w-full opacity-10"
                />
            </div>
        </footer>
    );
}