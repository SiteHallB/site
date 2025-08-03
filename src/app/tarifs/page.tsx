import { Metadata } from "next";

import Tarifs from "@/components/tarifs/tarifs";

export const metadata: Metadata = {
    title: "HALL B - Tarifs", 
    description: "Découvrez nos formules d'abonnement, tarifs sans engagement, et toutes les options pour profiter de votre salle de sport HALL B.",
};

export default function Page() {
    return <Tarifs/>;
}