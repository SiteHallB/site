import { Metadata } from "next";

import Plannings from "@/components/plannings/plannings";

export const metadata: Metadata = {
    title: "HALL B – Plannings | Salle de sport Saint Dionisy, Nîmes",
    description: "Consultez le planning des cours collectifs et activités de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard).",
    alternates: { canonical: "https://www.hallb.fr/plannings" },
};

export default function Page() {
    return <Plannings/>;
}