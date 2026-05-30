import { Metadata } from "next";

import Aqua from "@/components/tarifs/aqua/aqua";

export const metadata: Metadata = {
    title: "HALL B – Formule Aqua | Salle de sport Nîmes, Gard",
    description: "Formule Aqua de HALL B à Saint Dionisy (Nîmes, Gard) : muscu, cardio, bassin aqua, cours collectifs et smallgroups. Tout inclus.",
    alternates: { canonical: "https://www.hallb.fr/tarifs/aqua" },
    openGraph: {
        title: "HALL B – Formule Aqua | Salle de sport Nîmes, Gard",
        description: "Formule Aqua : plateau muscu + bassin chauffé et aquagym en illimité, à 15 min de Nîmes.",
        url: "https://www.hallb.fr/tarifs/aqua",
        type: "website",
        siteName: "HALL B",
    },
};

export default function Page() {
    return <Aqua/>;
}