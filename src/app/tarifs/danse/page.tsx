import { Metadata } from "next";

import Danse from "@/components/tarifs/danse/danse";

export const metadata: Metadata = {
    title: "HALL B - Danse", 
    description: "Découvrez le tarif des cours de danse chez HALL B. Cours adaptés à tous niveaux, avec un accompagnement tout au long de l'année.",
};

export default function Page() {
    return <Danse/>;
}