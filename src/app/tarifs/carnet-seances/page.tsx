"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        seance_unite, carnet_10, carnet_30, carnet_50, carnet_100, 
    } = useFormule();

    return (
        <IdsGroupPage title="Carnet de séances" subtitle="Choisissez un carnet de 1, 10, 30, 50 ou 100 séance(s) toutes activités confondues (sauf Squash)" ids={[seance_unite, carnet_10, carnet_30, carnet_50, carnet_100]}/>
    );
}