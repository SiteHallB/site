"use client";

import PageStructure from "@/components/ui/page-structure";

import { Baby, WavesLadder, CheckCheck, CalendarCheck2 } from "lucide-react";
import { PhoneNumber } from "@/components/ui/contact-widget";
import Clickable from "@/components/ui/clickable";
import { useImage } from "@/context/image-context";
import Image from "next/image";

export default function NatationEnfantVaunage() {
    const { bebe_nageur } = useImage();

    return (
        <PageStructure title="Natation" subtitle={<p>Cours de natation en vaunage - Piscine intérieure à Saint Dionisy.</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-4 flex-col">
                <p className="my-2">Chez HALL B à Saint-Dionisy, nous proposons :</p>
                <div className="flex flex-row items-start justify-start">
                    <Baby className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>Bébés nageurs</em> - pour familiariser les tout-petits avec l'eau en douceur</p>
                </div>
                <div className="flex flex-row items-start justify-start">
                    <WavesLadder className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>École de natation enfants</em> - apprendre à nager et gagner en confiance</p>
                </div>
                <div className="flex flex-row items-start justify-start">
                    <CheckCheck className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>Tests d'aisance aquatique certifiants</em> - indispensables pour certaines activités nautiques et colonies</p>
                </div>
            
                <div className="flex flex-row">
                    <CalendarCheck2 className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p>Paiement à la séance : réservation par téléphone ou en achetant directement votre séance/carnet de séances en ligne</p>
                </div>

                <div className="my-8 flex flex-col h-full justify-center items-center space-y-4">
                    <PhoneNumber/>
                    <Clickable
                        clickableType={{type: "link", path: "/tarifs/carnet-seances"}}
                        style={{variant: "navigationBar", color: "accent"}}
                    >
                        Acheter en ligne
                    </Clickable>
                </div>

                <div className="my-8 flex flex-col items-center h-full">
                    <p><strong>Horaires :</strong> (tous les Mercredis)</p>
                    <ul>
                        <li><p>11h00 : Bébés nageurs</p></li>
                        <li><p>17h00 : Groupe 3 / 4 / 5 ans</p></li>
                        <li><p>17h30 : Groupe 5 ans et +</p></li>
                    </ul>
                </div>

                <div className="max-w-100 aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                    <Image
                        {...bebe_nageur}
                        className="object-cover object-center size-full"
                    />
                </div>
            </div>
        </PageStructure>
    );
}