"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const { danse } = useFormule();

    return (
        <IdsGroupPage title="Boost" subtitle="Offre déclinée en ..." ids={[danse]}/>
    );
}