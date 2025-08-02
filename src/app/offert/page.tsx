"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function Page() {
    const { seance_decouverte } = useFormule();
    
    return (
        <IdsGroupPage revenir={false} title="Essai offert" subtitle="Venez tester la salle gratuitement et sans engagement" ids={[seance_decouverte]}/>
    );
}