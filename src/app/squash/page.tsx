import { Metadata } from "next";

import SportigoFormule from "@/components/ui/sportigo-formule";
import SportigoSquash from "@/components/ui/sportigo-squash";

import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import PageStructure from "@/components/ui/page-structure";

export const metadata: Metadata = {
    title: "HALL B - Squash", 
    description: "Réservez l'un des deux terrains de Squash de HALL B à Saint Dionisy en ligne.",
};

export default function Page() {
    return (
        <PageStructure title="Squash" subtitle={<p>Réservez votre terrain en quelques clics</p>}>
            <SportigoSquash/>
        </PageStructure>
    );
}