import { Metadata } from "next";

import Tarifs from "@/components/tarifs/tarifs";

export const metadata: Metadata = {
    title: "HALL B – Tarifs | Salle de sport Saint Dionisy, Nîmes, Gard",
    description: "Découvrez les formules d'abonnement de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard) : Classic, Boost, Aqua, Danse.",
};

export default function Page() {
    return <Tarifs/>;
}