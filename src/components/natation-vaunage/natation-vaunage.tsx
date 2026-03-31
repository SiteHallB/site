"use client";

import PageStructure from "@/components/ui/page-structure";

import { Sun, Baby, WavesLadder, CheckCheck, CalendarCheck2 } from "lucide-react";
import { PhoneNumber } from "@/components/ui/contact-widget";
import Clickable from "@/components/ui/clickable";
import { useImage } from "@/context/image-context";
import Image from "next/image";

export default function NatationVaunage() {
    const { bebe_nageur } = useImage();

    return (
        <PageStructure title="Natation Enfant" subtitle={<p>Cours de natation en vaunage - Piscine intérieure à Saint Dionisy.</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-4 flex-col">
                <div className="flex flex-row items-center justify-start">
                    <Sun className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p>L'été approche ! Pensez à la sécurité aquatique de vos enfants tout en leur faisant découvrir le plaisir de l'eau.</p>
                </div>
                <p className="my-2">Au Hall B à Saint-Dionisy, nous proposons :</p>
                <div className="flex flex-row items-center justify-start">
                    <Baby className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>Bébés nageurs</em> - pour familiariser les tout-petits avec l'eau en douceur</p>
                </div>
                <div className="flex flex-row items-center justify-start">
                    <WavesLadder className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>École de natation enfants</em> - apprendre à nager et gagner en confiance</p>
                </div>
                <div className="flex flex-row items-center justify-start">
                    <CheckCheck className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p><em>Tests d'aisance aquatique certifiants</em> - indispensables pour certaines activités nautiques et colonies</p>
                </div>

                <p className="my-2">Encadrés par des maitres nageurs diplomés et avec la garantie d'avoir maximum 5 enfants par cours, les enfants apprennent à être en sécurité dans l'eau tout en s'amusant.</p>

                <div className="flex flex-wrap items-center justify-start">
                    <CalendarCheck2 className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                    <p>Paiement à la séance : réservation par téléphone (</p><PhoneNumber/><p className="mr-2">) ou en achetant directement votre séance/carnet de séances en ligne</p>
                    <Clickable
                        clickableType={{type: "link", path: "/tarifs/carnet-seances"}}
                        style={{}}
                        className="hoverUnderline"
                    >
                        <p><strong>acheter en ligne</strong></p>
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