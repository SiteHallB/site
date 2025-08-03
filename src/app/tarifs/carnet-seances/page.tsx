"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        carnet_10, carnet_30, carnet_50, carnet_100, 
    } = useFormule();

    return (
        <IdsGroupPage title="Boost" subtitle="Choisissez un carnet de 10, 30, 50 ou 100 séances toutes activités confondues (sauf Squash)" ids={[carnet_10, carnet_30, carnet_50, carnet_100]}/>
    );
}