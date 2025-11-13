import { Metadata } from "next";

import CarteCadeau from "@/components/tarifs/carte-cadeau/carte-cadeau";

export const metadata: Metadata = {
    title: "HALL B - Carte cadeau", 
    description: "Offrez une séance à vos proches avec la carte cadeau HALL B, valable pour toutes nos activités et sans engagement.",
};

export default function Page() {
    return <CarteCadeau/>;
}