"use client";

import PageStructure from "@/components/ui/page-structure";
import SportigoFormule from "@/components/ui/sportigo-formule";
import SportigoSquash from "@/components/ui/sportigo-squash";
import Separator from "@/components/ui/separator";
import RevenirAuxTarifs from "@/components/tarifs/revenir-aux-tarifs";
import { useFormule } from "@/context/formule-context";

export default function TarifsSquash() {
    const { pass_squash, squash_heure_creuse, squash_heure_pleine } = useFormule();

    return (
        <PageStructure
            title="Squash"
            subtitle={<p>Deux terrains de squash à réserver en ligne, 7j/7. Jouez à la séance ou prenez le <span className="text-accent uppercase">Pass Squash</span> pour jouer toute l'année.</p>}
        >
            <div className="w-full overflow-x-hidden pt-1 flexCenter flex-col gap-y-content">
                <RevenirAuxTarifs/>

                {/* Pass à l'année + séances heures creuses / pleines */}
                <section aria-labelledby="squash-tarifs" className="w-full flex flex-col gap-y-content">
                    <div className="text-center">
                        <h2 id="squash-tarifs" className="text-foreground-base">Tarifs</h2>
                        {/* Plages horaires telles que paramétrées dans le planning Sportigo 4645 */}
                        <p className="text-foreground-subdued">
                            <span className="text-accent">Heures creuses</span> : du lundi au vendredi de 8h à 17h, le week-end de 8h à 20h.{" "}
                            <span className="text-accent">Heures pleines</span> : du lundi au vendredi de 17h à 22h.
                        </p>
                    </div>
                    <SportigoFormule ids={[pass_squash, squash_heure_creuse, squash_heure_pleine]}/>
                </section>

                <Separator/>

                {/* Planning de réservation */}
                <section aria-labelledby="squash-planning" className="w-full flex flex-col gap-y-content">
                    <div className="text-center">
                        <h2 id="squash-planning" className="text-foreground-base">Réserver un terrain</h2>
                        <p className="text-foreground-subdued">Choisissez votre créneau : chaque horaire indique s'il est en heure creuse ou en heure pleine.</p>
                    </div>
                    <div className="bg-background-highlight rounded-xl w-full p-1 max-h-[70vh] overflow-y-auto overscroll-contain">
                        <SportigoSquash/>
                    </div>
                </section>
            </div>
        </PageStructure>
    );
}
