"use client";

import IdsGroupPage from "@/components/tarifs/ids-group-page";

export default function EssaiOffert({ titre, sousTitre, idSportigo }: { titre: string; sousTitre: string; idSportigo: number }) {
    return (
        <IdsGroupPage revenir={false} title={titre} subtitle={<p>{sousTitre}</p>} ids={[idSportigo]}/>
    );
}
