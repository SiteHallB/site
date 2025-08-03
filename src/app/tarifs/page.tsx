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
        <PageStructure title="Tarifs"
            subtitle="Choisissez l'offre adaptée à vos besoins. Nos formules Classic, Boost, et Aqua sont disponibles en payement un mois sans engagement, mensuel, ou annuel.">
            <div className="w-full pt-1 flexCenter flex-col">

                {/* Formules principales */}
                <ul className="list-none w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Classic */}
                    <li className="w-full max-w-90">
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
                    />
                    </li>

                    {/* Boost */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Boost"
                        subtitle="Classic + Cours collectifs"
                        prix={50}
                        images={[ tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, ]}
                        checkDescription={[
                            "Accès libre au plateau 7/7j de 6h à 23h", 
                            <>Accès illimité au planning de<span className="text-accent uppercase"> Cours Co</span></>, 
                        ]}
                        plusDescription={[
                            <><span className="text-accent">5€</span> pour les <span className="text-accent uppercase">SmallGroups</span></>
                        ]}
                        actionLink="/tarifs/boost"
                    />
                    </li>

                    {/* Aqua */}
                    <li className="w-full max-w-90">
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
                    />
                    </li>
                </ul>

                <Separator/>

                {/* Autres formules */}
                <ul className="w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Carnet de séances */}
                    <li className="w-full max-w-90">
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
                    />
                    </li>

                    {/* Danse */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Danse"
                        subtitle="250€/an : 1h/semaine"
                        images={[ tarifs_danse_1, ]}
                        checkDescription={[
                            "Toute l'année", 
                            "Progression", 
                        ]}
                        plusDescription={[<><span className="text-accent">150€</span>/an pour 1 danse supplémentaire</>]}
                        actionLink="/tarifs/danse"
                    />
                    </li>
                </ul>
            </div>
        </PageStructure>
    );
}