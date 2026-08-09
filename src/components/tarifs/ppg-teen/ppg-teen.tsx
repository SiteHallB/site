"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function PpgTeen() {
    const { ppg_teen } = useFormule();

    return (
        <IdsGroupPage
            title="PPG Teen"
            subtitle={<>
                <p>Préparation Physique Générale pour les <span className="text-accent">10-14 ans</span> : améliorer les qualités physiques, apprendre les bons gestes sportifs et progresser dans un environnement motivant et sécurisé.</p>
                <p className="mt-content">Tous les mercredis de <span className="text-accent">17h00 à 17h45</span> — rentrée le mercredi 2 septembre.</p>
            </>}
            ids={[ppg_teen]}/>
    );
}
