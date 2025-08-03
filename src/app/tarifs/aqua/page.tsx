import { Metadata } from "next";

import Boost from "@/components/tarifs/boost/boost";

export const metadata: Metadata = {
    title: "HALL B - Aqua", 
    description: "Découvrez la Formule Aqua : accès illimité aux plateaux muscu et cardio, bassin d'AQUA, cours collectifs, smallgroups : la totale de HALL B.",
};

export default function Page() {
    return <Boost/>;
}