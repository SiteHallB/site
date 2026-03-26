"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";

export default function CarnetSeances() {
    const {
        seance_unite, carnet_10, carnet_30, carnet_50, carnet_100, 
    } = useFormule();

    return (
        <IdsGroupPage
            title="Carnet de séances"
            subtitle={
                <>
                    <p>Choisissez un carnet de 1, 10, 30, 50 ou 100 séance(s) toutes activités confondues (sauf Squash).</p><br/>
                    <p><strong>Natation enfants et bébés nageurs :</strong> (tous les Mercredis)</p>
                    <ul>
                        <li><p>11h00 : Bébés nageurs</p></li>
                        <li><p>17h00 : Groupe 3 / 4 / 5 ans</p></li>
                        <li><p>17h30 : Groupe 5 ans et +</p></li>
                    </ul>
                </>
            }
            ids={[seance_unite, carnet_10, carnet_30, carnet_50, carnet_100]}
        />
    );
}