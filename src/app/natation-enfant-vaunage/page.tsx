import { Metadata } from "next";

import NatationVaunage from "@/components/natation-enfant-vaunage/natation-enfant-vaunage";

export const metadata: Metadata = {
    title: "HALL B – Natation Enfant | Vaunage, Saint Dionisy, Nîmes",
    description: "Cours de natation enfant en Vaunage – Piscine intérieure à Saint Dionisy, près de Nîmes (Gard). Inscriptions ouvertes.",
    alternates: { canonical: "https://www.hallb.fr/natation-enfant-vaunage" },
};

export default function Page() {
    return <NatationVaunage/>
}