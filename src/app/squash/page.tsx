import { Metadata } from "next";

import Squash from "@/components/squash/squash";

export const metadata: Metadata = {
    title: "HALL B - Squash", 
    description: "Réservez l'un des deux terrains de Squash de HALL B à Saint Dionisy en ligne.",
};

export default function Page() {
    return <Squash/>
}