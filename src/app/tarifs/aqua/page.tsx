import { Metadata } from "next";

import Aqua from "@/components/tarifs/aqua/aqua";

export const metadata: Metadata = {
    title: "HALL B – Formule Aqua | Salle de sport Nîmes, Gard",
    description: "Formule Aqua de HALL B à Saint Dionisy (Nîmes, Gard) : muscu, cardio, bassin aqua, cours collectifs et smallgroups. Tout inclus.",
};

export default function Page() {
    return <Aqua/>;
}