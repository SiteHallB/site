"use client"

import PageStructure from "@/components/ui/page-structure";
import FormuleOverview from "@/components/tarifs/formule-overview"
import Separator from "@/components/ui/separator";
import { useImage } from "@/context/image-context";

export default function Page() {
    const { tarifs_classic_1, tarifs_classic_2, 
            tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, 
            tarifs_aqua_1, tarifs_aqua_2, tarifs_aqua_3, tarifs_danse_1 } = useImage();

    return (
        <PageStructure title="Tarifs" subtitle="Choisissez la formule adaptée à vos besoins">
            <div className="w-full pt-1 flexCenter flex-col">

                {/* Formules principales */}
                <div className="w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Classic */}
                    <FormuleOverview
                        title="Classic"
                        subtitle="Musculation & cardio"
                        prix={40}
                        images={[ tarifs_classic_1, tarifs_classic_2 ]}
                        checkDescription={[
                            "Accès libre au plateau 7/7j de 6h à 23h", 
                        ]}
                        plusDescription={[]}
                        actionLink="/tarifs/classic"
                        className=""
                    />

                    {/* Boost */}
                    <FormuleOverview
                        title="Boost"
                        subtitle="Classic + Cours collectifs"
                        prix={50}
                        images={[ tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, ]}
                        checkDescription={[
                            "Accès libre au plateau 7/7j de 6h à 23h", 
                            "Accès illimité au planning de cours collectifs", 
                        ]}
                        plusDescription={[
                            <><span className="text-accent">5€</span> pour les <span className="text-accent uppercase">SmallGroups</span></>
                        ]}
                        actionLink="/tarifs/boost"
                        className=""
                    />

                    {/* Aqua */}
                    <FormuleOverview
                        title="Aqua"
                        subtitle="Classic + Aqua"
                        prix={75}
                        images={[ tarifs_aqua_1, tarifs_aqua_2, tarifs_aqua_3 ]}
                        checkDescription={[
                            "Accès libre au plateau 7/7j de 6h à 23h", 
                            <>Accès illimité au planning d'<span className="text-accent">AQUA</span></>
                        ]}
                        plusDescription={[
                            <><span className="text-accent">5€</span> pour les <span className="text-accent uppercase">Cours Co</span></>, 
                            <><span className="text-accent">10€</span> pour
                                <span className="text-accent uppercase"> Cours Co</span> et 
                                <span className="text-accent uppercase"> SmallGroups</span>
                            </>
                        ]}
                        actionLink="/tarifs/aqua"
                        className=""
                    />
                </div>

                <Separator/>

                {/* Autres formules */}
                <div className="w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Carnet de séances */}
                    <FormuleOverview
                        title="Carnet de séances"
                        subtitle="Envie de flexibilité ?"
                        images={[ tarifs_classic_1, tarifs_classic_2, 
            tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, 
            tarifs_aqua_1 ]}
                        checkDescription={[
                            "Accéder à la salle pour X séances sans engagement", 
                            "Toutes activités confondues (Squash non compris)", 
                        ]}
                        plusDescription={[]}
                        actionLink="/tarifs/carnet_seances"
                        className=""
                    />

                    {/* Danse */}
                    <FormuleOverview
                        title="Danse"
                        subtitle="1h/semaine"
                        images={[ tarifs_danse_1, ]}
                        checkDescription={[
                            "Toute l'année", 
                            "Progression", 
                        ]}
                        plusDescription={[<><span className="text-accent">5€</span> pour 1 danse supplémentaire</>]}
                        actionLink="/tarifs/danses"
                        className=""
                    />
                </div>
            </div>
        </PageStructure>
    );
}