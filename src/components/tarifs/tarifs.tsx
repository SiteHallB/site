"use client"

import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
            tarifs_aqua_1, tarifs_aqua_2, tarifs_aqua_3, tarifs_danse_1, squash, bebe_nageur } = useImage();

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
                        subtitle="Classic + Cours collectifs + SmallGroups"
                        prix={<p className="textSmall">A partir de <span className="textSubH2">55€</span>/mois</p>}
                        images={[ tarifs_boost_1, tarifs_boost_2, tarifs_boost_3, tarifs_boost_4, tarifs_boost_5, ]}
                        checkDescription={[
                            <p>Accès libre au plateau 7/7j de 6h à 23h</p>, 
                            <p>Accès illimité au planning de<span className="text-accent uppercase"> Cours Co</span></p>, 
                            <p>Accès illimité aux <span className="text-accent uppercase">SmallGroups</span></p>, 
                        ]}
                        plusDescription={[]}
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
                                <span className="text-accent">10€</span> <span className="text-accent uppercase">Boost</span>
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

                    {/* Natation enfants */}
                    <li className="w-full max-w-90">
                    <FormuleOverview
                        title="Natation enfants"
                        subtitle="Tous les Mercredis"
                        prix={<p className="textSmall">A partir de <span className="textSubH2">15€</span></p>}
                        images={[ bebe_nageur, ]}
                        checkDescription={[
                            <p>11h00 : Bébés nageurs</p>, 
                            <p>17h00 : Groupe 3 / 4 / 5 ans</p>, 
                            <p>17h30 : Groupe 5 ans et +</p>, 
                        ]}
                        plusDescription={[
                            <p>Encadré par un maître-nageur diplômé</p>, 
                            <p>Maximum 5 enfants par cours pour un apprentissage personnalisé et de qualité</p>, 
                        ]}
                        actionLink="/tarifs/carnet-seances"
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

                {/* Contenu SEO */}
                <Separator/>
                <section className="w-full max-w-3xl mt-content text-foreground-subdued text-left">
                    <h2 className="text-foreground-base mb-content">Quel abonnement choisir chez HALL B ?</h2>
                    <p className="mb-content">
                        HALL B propose des <strong>formules d&apos;abonnement</strong> adaptées à chaque objectif et
                        chaque budget, dans sa salle de sport de 2 400 m² à <strong>Saint-Dionisy</strong>, à 15 minutes
                        de <strong>Nîmes</strong>. La formule <strong>Classic</strong> (à partir de 40€/mois) donne un
                        accès libre au plateau de musculation et cardio 7j/7 de 6h à 23h. La formule{" "}
                        <strong>Boost</strong> (à partir de 55€/mois) ajoute l&apos;accès illimité à tous les{" "}
                        <Link href="/cours" className="text-accent hoverUnderline">cours collectifs</Link> et small groups.
                    </p>
                    <p className="mb-content">
                        Pour la pratique aquatique, la formule <strong>Aqua</strong> inclut le bassin chauffé et les
                        séances d&apos;aquagym. Besoin de souplesse ? Le <strong>carnet de séances</strong> permet de
                        venir sans engagement, et la <strong>carte cadeau</strong> est valable sur toutes nos activités.
                        La <Link href="/squash" className="text-accent hoverUnderline">réservation de squash</Link> se
                        fait séparément, en ligne.
                    </p>
                    <p>
                        Toutes nos formules sont disponibles <strong>sans engagement, en mensuel ou en annuel</strong>.
                        Pas encore décidé ? Profitez d&apos;une{" "}
                        <Link href="/essai-offert" className="text-accent hoverUnderline">séance d&apos;essai offerte</Link>{" "}
                        pour découvrir la salle avant de vous inscrire.
                    </p>
                </section>
            </div>
        </PageStructure>
    );
}