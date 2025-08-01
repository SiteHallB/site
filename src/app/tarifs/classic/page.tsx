"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const { classic_unmois, classic_mensuel, classic_annuel } = useFormule();

    return (
        <IdsGroupPage title="Classic" subtitle="Offre déclinée en ..." ids={[classic_unmois, classic_mensuel, classic_annuel]}/>
    );
}