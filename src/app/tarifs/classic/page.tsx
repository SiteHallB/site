import { Metadata } from "next";

import Classic from "@/components/tarifs/classic/classic";

export const metadata: Metadata = {
    title: "HALL B - Classic", 
    description: "Accès 7/7j aux plateaux muscu et cardio de HALL B. Découvrez toutes les options de paiement de cette offre à ne pas manquer.",
};

export default function Page() {
    return <Classic/>;
}