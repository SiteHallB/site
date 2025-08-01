"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const {
        carnet_10, carnet_30, carnet_50, carnet_100, 
    } = useFormule();

    return (
        <IdsGroupPage title="Boost" subtitle="Offre déclinée en ..." ids={[carnet_10, carnet_30, carnet_50, carnet_100]}/>
    );
}