"use client"

import SportigoSquash from "@/components/ui/sportigo-squash";

import PageStructure from "@/components/ui/page-structure";
import { useFormule } from "@/context/formule-context";

export default function Squash() {
    const { credit_squash_pleine, credit_squash_creuse } = useFormule();

    return (
        <PageStructure title="Squash" subtitle={<p>Réservez votre terrain en quelques clics.</p>}>
            <div className="bg-background-highlight rounded-xl w-full p-1 flexCenter">
            <SportigoSquash/>
            </div>
        </PageStructure>
    );
}