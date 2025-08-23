"use client"

import SportigoFormule from "@/components/ui/sportigo-formule";
import SportigoSquash from "@/components/ui/sportigo-squash";

import PageStructure from "@/components/ui/page-structure";
import { useFormule } from "@/context/formule-context";

export default function Squash() {
    const { credit_squash_pleine, credit_squash_creuse } = useFormule();

    return (
        <PageStructure title="Squash" subtitle={<p>Réservez votre terrain en quelques clics : achetez d'abord votre <span className="text-accent">crédit Squash</span> puis utilisez le quand vous voulez en sélectionnant le créneau qui vous convient dans le planning Squash en-dessous.</p>}>
            <SportigoFormule ids={[credit_squash_pleine, credit_squash_creuse]}/> 
            <SportigoSquash/>
        </PageStructure>
    );
}