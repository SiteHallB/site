"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";
import { useFormule } from "@/context/formule-context";
import Clickable from "@/components/ui/clickable";

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
                    <p>Natation enfants et bébés nageurs : voir infos et plannings sur
                    <Clickable
                        clickableType={{type: "link", path: "/natation-vaunage"}}
                        style={{}}
                        className="hoverUnderline ml-2"
                    >
                        <strong>natation enfant vaunage</strong>
                    </Clickable> </p>
                </>
            }
            ids={[seance_unite, carnet_10, carnet_30, carnet_50, carnet_100]}
        />
    );
}