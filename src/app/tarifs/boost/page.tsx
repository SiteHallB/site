import { Metadata } from "next";

import Boost from "@/components/tarifs/boost/boost";

export const metadata: Metadata = {
    title: "HALL B - Boost", 
    description: "Découvrez la Formule Boost : accès illimité aux plateaux muscu et cardio, cours collectifs, smallgroups pour progresser rapidement chez HALL B.",
};

export default function Page() {
    return <Boost/>;
}