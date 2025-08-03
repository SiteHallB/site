import { Metadata } from "next";

import CarnetSeances from "@/components/tarifs/carnet-seances/carnet-seances";

export const metadata: Metadata = {
    title: "HALL B - Carnet de séances", 
    description: "Besoin de flexibilité ? Découvrez HALL B pour 1, 10, 30, 50, ou 100 séance(s) toutes activités confondues.",
};

export default function Page() {
    return <CarnetSeances/>;
}