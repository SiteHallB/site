"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const { seance_decouverte } = useFormule();
    
    return (
        <IdsGroupPage revenir={false} title="Essaie offert" subtitle="Venez tester la salle ..." ids={[seance_decouverte]}/>
    );
}