import { Metadata } from "next";

import Plannings from "@/components/plannings/plannings";

export const metadata: Metadata = {
    title: "HALL B - Aqua", 
    description: "Consultez le planning de la salle de sport HALL B à Saint Dionisy (Vaunage, proche de Nimes).",
};

export default function Page() {
    return <Plannings/>;
}