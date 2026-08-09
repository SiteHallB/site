"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function PpgKid() {
    const { ppg_kid } = useFormule();

    return (
        <IdsGroupPage
            title="PPG Kid"
            subtitle={<>
                <p>Préparation Physique Générale pour les <span className="text-accent">6-9 ans</span> : un cours ludique pour développer la motricité, la coordination, l'équilibre, la force et la confiance en soi.</p>
                <p className="mt-content">Tous les mercredis de <span className="text-accent">16h00 à 16h45</span> — rentrée le mercredi 2 septembre.</p>
            </>}
            ids={[ppg_kid]}/>
    );
}
