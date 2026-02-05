"use client"

import { ChevronRight } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import FormuleOverview from "@/components/tarifs/formule-overview"
import Separator from "@/components/ui/separator";
import Clickable from "@/components/ui/clickable";

import { useImage } from "@/context/image-context";

function QueryFilter({ path, option, text }: { path: string; option: string, text: React.ReactNode}) {
    return (
        <Clickable
            clickableType={{
                type: "link",
                path: path,
                query: { option: option }
            }}
            style={{}}
            className="inline-block"
        >
            <span className="mx-2 text-accent uppercase">{text}</span>
        </Clickable>
    );
}

export default function Tarifs() {
    const { tarifs_classic_1, tarifs_classic_2, 
            tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, 
            tarifs_aqua_1, tarifs_aqua_2, tarifs_aqua_3, tarifs_danse_1, squash } = useImage();

    return (
        <PageStructure title="Tarifs"
            subtitle={<p>Choisissez l'offre adaptée à vos besoins. Nos formules Classic, Boost, et Aqua sont disponibles en paiement sans engagement, mensuel, ou annuel.</p>}>
            <div className="w-full pt-1 flexCenter flex-col">
                {/* Liens squash */}
                <Clickable
                    clickableType={{type: "link", path: "/squash"}}
                    style={{variant: "menuMainButton"}}
                    className="mb-subSection flexCenter flex-row"
                >
                    Voir tarifs Squash
                    <ChevronRight className="size-4 lg:size-6"/>
                </Clickable>

                {/* Formules principales */}
                <ul className="list-none w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Classic */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Classic"
                        subtitle="Musculation & cardio"
                        prix={<p className="textSmall">A partir de <span className="textSubH2">40€</span>/mois</p>}
                        images={[ tarifs_classic_1, tarifs_classic_2 ]}
                        checkDescription={[
                            <p>Accès libre au plateau 7/7j de 6h à 23h</p>, 
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
                        prix={<p className="textSmall">A partir de <span className="textSubH2">50€</span>/mois</p>}
                        images={[ tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, ]}
                        checkDescription={[
                            <p>Accès libre au plateau 7/7j de 6h à 23h</p>, 
                            <p>Accès illimité au planning de<span className="text-accent uppercase"> Cours Co</span></p>, 
                        ]}
                        plusDescription={[
                            <p className="h-fit inline-block">
                                <span className="text-accent">5€</span> pour les
                                <QueryFilter
                                    path="/tarifs/boost"
                                    option="small-groups"
                                    text={<>SmallGroups</>}
                                />
                            </p>
                        ]}
                        actionLink="/tarifs/boost"
                    />
                    </li>

                    {/* Aqua */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Aqua"
                        subtitle="Classic + Aqua"
                        prix={<p className="textSmall">A partir de <span className="textSubH2">75€</span>/mois</p>}
                        images={[ tarifs_aqua_1, tarifs_aqua_2, tarifs_aqua_3 ]}
                        checkDescription={[
                            <p>Accès libre au plateau 7/7j de 6h à 23h</p>, 
                            <p>Accès illimité au planning d'<span className="text-accent">AQUA</span></p>
                        ]}
                        plusDescription={[
                            <p className="h-fit inline-block">
                                <span className="text-accent">5€ </span>
                                pour les 
                                <QueryFilter
                                    path="/tarifs/aqua"
                                    option="cours-co"
                                    text={<>Cours Co</>}
                                />
                            </p>, 
                            <p className="h-fit inline-block">
                                <span className="text-accent">10€</span> pour les <span className="text-accent uppercase">Cours Co </span>
                                et les
                                <QueryFilter
                                    path="/tarifs/aqua"
                                    option="small-groups"
                                    text={<>SmallGroups</>}
                                />
                            </p>
                        ]}
                        actionLink="/tarifs/aqua"
                    />
                    </li>
                </ul>

                <Separator/>

                {/* Autres formules */}
                <ul className="mt-content w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Carnet de séances */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Carnet de séances"
                        subtitle="Envie de flexibilité ?"
                        prix={<p className="textSmall">A partir de <span className="textSubH2">15€</span></p>}
                        images={[ tarifs_classic_1, tarifs_classic_2, 
            tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, 
            tarifs_aqua_1 ]}
                        checkDescription={[
                            <p>Accéder à la salle pour X séances sans engagement</p>, 
                            <p>Toutes activités confondues (Squash non compris)</p>, 
                        ]}
                        plusDescription={[]}
                        actionLink="/tarifs/carnet-seances"
                    />
                    </li>

                    {/* Danse */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Danse"
                        subtitle="1h/semaine"
                        prix={<p className="textSmall"><span className="textSubH2">250€</span>/an</p>}
                        images={[ tarifs_danse_1, ]}
                        checkDescription={[
                            <p>Niveau débutant et avancé</p>, 
                            <p>Progression accompagnée sur l'année</p>, 
                        ]}
                        plusDescription={[<p><span className="text-accent">150€</span>/an pour 1 danse supplémentaire</p>]}
                        actionLink="/tarifs/danse"
                    />
                    </li>
                </ul>

                <Separator/>
                {/* Offert */}

                <FormuleOverview
                    title="Carte Cadeau"
                    subtitle="Pensez à vos proches !"
                    prix={<p>Choisissez votre prix</p>}
                    images={[ squash, tarifs_classic_1, tarifs_classic_2, 
            tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, 
            tarifs_aqua_1 ]}
                    checkDescription={[
                        <p>Valable pour toutes nos activités.</p>, 
                    ]}
                    plusDescription={[]}
                    actionLink="/carte-cadeau"
                    className="mt-content"
                />
            </div>
        </PageStructure>
    );
}