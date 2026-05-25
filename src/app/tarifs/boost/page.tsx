import { Metadata } from "next";

import Boost from "@/components/tarifs/boost/boost";

export const metadata: Metadata = {
    title: "HALL B – Formule Boost | Salle de sport Nîmes, Gard",
    description: "Formule Boost de HALL B à Saint Dionisy (Nîmes, Gard) : accès illimité aux plateaux muscu, cardio, cours collectifs et smallgroups.",
};

export default function Page() {
    return <Boost/>;
}