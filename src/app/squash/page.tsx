import { Metadata } from "next";

import SportigoFormule from "@/components/ui/sportigo-formule";
import SportigoSquash from "@/components/ui/sportigo-squash";

import { Email, PhoneNumber } from "@/components/ui/contact-widget";
import PageStructure from "@/components/ui/page-structure";

export const metadata: Metadata = {
    title: "HALL B - Aqua", 
    description: "Réservez l'un des deux terrains de Squash de HALL B à Saint Dionisy en ligne.",
};

export default function Page() {
    return (
        <PageStructure title="Squash" subtitle={<p>Réservez votre terrain en quelques clics</p>}>
            {/* <SportigoSquash/> */}
            <p className="text-foreground-base">Vous pourrez prochainement réserver directement en ligne !</p>
            <p className="text-foreground-base">En attendant, veuillez effectuer votre réservation en nous contactant directement par téléphone ou par mail</p>
            <div className="bg-background-highlight p-content rounded-xl flex flex-wrap gap-content">
            <PhoneNumber/>
            <Email/>
            </div>
        </PageStructure>
    );
}