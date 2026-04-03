"use client"

import SportigoSquash from "@/components/ui/sportigo-squash";

import PageStructure from "@/components/ui/page-structure";
import { useFormule } from "@/context/formule-context";
import { Flame } from "lucide-react";
import { useImage } from "@/context/image-context";
import Image from "next/image";

export default function Squash() {
    const { credit_squash_pleine, credit_squash_creuse } = useFormule();
    const { squash } = useImage();

    return (
        <PageStructure title="Squash" subtitle={<p>Envie de vous défouler ou de partager un bon moment entre amis ? Nos terrains de squash vous attendent au HALL B à Saint-Dionisy !</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-1 flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center py-3 px-4 w-full space-y-4">
                    <div className="flex flex-row items-center justify-center">
                        <Flame className="mr-2 text-accent size-5 lg:size-7 shrink-0"/>
                        <p>Au programme :</p>
                    </div>
                    <ul>
                        <li><p>• Location de terrain facilement en ligne</p></li>
                        <li><p>• Location de raquettes sur place</p></li>
                        <li><p>• Tournois réguliers pour se challenger</p></li>
                    </ul>
                    <div className="max-w-100 aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                        <Image
                            {...squash}
                            className="object-cover object-center size-full"
                        />
                    </div>
                </div>
                <SportigoSquash/>
            </div>
        </PageStructure>
    );
}