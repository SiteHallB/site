"use client"

import SportigoFormule from "@/components/ui/sportigo-formule";
import PageStructure from "@/components/ui/page-structure";
import FormuleOverview from "@/components/tarifs/formule-overview"
import Separator from "@/components/ui/separator";

export default function Page() {
    return (
        <PageStructure title="Tarifs" subtitle="Sélectionnez l'offre qui vous convient">
            <div className="w-full pt-1 flexCenter flex-col">

                {/* Formules principales */}
                <div className="w-full flex flex-wrap justify-center gap-y-10 gap-x-content lg:gap-x-contentLg">
                    {/* Boost */}
                    <FormuleOverview
                        aboveFold={true}
                        title="Classic"
                        subtitle="Sous titre"
                        prix={75}
                        description="Blabla"
                        images={[
                            { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                        ]}
                        checkDescription={[
                            "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                            <><span className="text-accent">Small groups</span> pour 5 euros supplémentaires</>, 
                            "Encore un"
                        ]}
                        actionLink="/tarifs/classic"
                        className=""
                    />

                    {/* Boost */}
                    <FormuleOverview
                        aboveFold={true}
                        title="Boost"
                        subtitle="Classic + "
                        prix={75}
                        description="Blabla"
                        images={[
                            { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                        ]}
                        checkDescription={[
                            "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                            <><span className="text-accent">Small groups</span> pour 5 euros supplémentaires</>, 
                            "Encore un"
                        ]}
                        actionLink="/tarifs/boost"
                        className=""
                    />

                    {/* Aqua */}
                    <FormuleOverview
                        aboveFold={true}
                        title="Aqua"
                        subtitle="Classic + Aqua"
                        prix={75}
                        description="Blabla"
                        images={[
                            { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                        ]}
                        checkDescription={[
                            "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                            <><span className="text-accent">Small groups</span> pour 5 euros supplémentaires</>, 
                            "Encore un"
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
                        aboveFold={true}
                        title="Carnet de séances"
                        subtitle="Sous titre"
                        description="Blabla"
                        images={[
                            { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
                            { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
                        ]}
                        checkDescription={[
                            "Accès 7jours/7 de 7h à 23h au plateau muscu/cardio", 
                            <><span className="text-accent">Small groups</span> pour 5 euros supplémentaires</>, 
                            "Encore un"
                        ]}
                        actionLink="/tarifs/classic"
                        className=""
                    />
                </div>
            </div>
        </PageStructure>
    );
}