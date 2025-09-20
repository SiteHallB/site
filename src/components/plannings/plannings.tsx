"use client"

import PageStructure from "@/components/ui/page-structure";
import SportigoPlannings from "@/components/plannings/sportigo-plannings";
import Image from "next/image";
import { ImageType, useImage } from "@/context/image-context";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ActivityDescription from "./activity-description";
import Separator from "../ui/separator";

function FullPlannings(
    { title, desktop, lundi, mardi, mercredi, jeudi, vendredi, samedi }: 
    { title: string; desktop: ImageType; lundi?: ImageType; mardi?: ImageType; mercredi?: ImageType; jeudi?: ImageType; vendredi?: ImageType; samedi?: ImageType; }
) {
    return (
        <div className="w-full">
            <div className="bg-background-highlight rounded-xl w-full p-1 hidden lg:flex justify-center">
                <img {...desktop}/>
            </div>

            <div className="w-full block lg:hidden flex flex-col items-center gap-content">
            <h2 className="text-center">{title}</h2>
            <Swiper
                className="w-full"
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={-50}
                slidesPerView={1.3}
                centeredSlides
                navigation
                pagination={{ clickable: true }}
            >
                {[ lundi, mardi, mercredi, jeudi, vendredi, samedi ].filter((el) => el !== undefined).map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="select-none overflow-hidden rounded transition-all duration-300 ease-in-out swiper-slide-custom"
                    >
                        <img
                            {...image}
                            className="w-full h-full object-cover object-center"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </div>
    );
}

export default function Plannings() {
    const {
        plannings_desktop, plannings_lundi, plannings_mardi, plannings_mercredi, plannings_jeudi, plannings_vendredi, plannings_samedi, plannings_danse, 
        plannings_aqua_desktop, plannings_aqua_lundi, plannings_aqua_mardi, plannings_aqua_mercredi, plannings_aqua_jeudi, plannings_aqua_vendredi, 
    } = useImage();

    return (
        <PageStructure title="Plannings" subtitle={<p>Consultez nos nombreuses activités</p>}>
            <FullPlannings
                title="Cours co - Small Groups"
                desktop={plannings_desktop}
                lundi={plannings_lundi}
                mardi={plannings_mardi}
                mercredi={plannings_mercredi}
                jeudi={plannings_jeudi}
                vendredi={plannings_vendredi}
                samedi={plannings_samedi}
            />

            <FullPlannings
                title="AQUA"
                desktop={plannings_aqua_desktop}
                lundi={plannings_aqua_lundi}
                mardi={plannings_aqua_mardi}
                mercredi={plannings_aqua_mercredi}
                jeudi={plannings_aqua_jeudi}
                vendredi={plannings_aqua_vendredi}
            />

            <div className="w-full flex flex-col items-center gap-content">
            <h2 className="text-center">Danse</h2>
            <div className="bg-background-highlight rounded-xl w-full p-1 max-w-120">
            <img
                {...plannings_danse}
            />
            </div>
            </div>

            <Separator/>
            
            <div className="w-full lg:px-50 px-contentLg gap-10 py-10 lg:py-20 flex flex-col lg:grid grid-cols-2">
            <ActivityDescription title="Pilates" illustration="/images/plannings/yoga.svg" path="/tarifs/boost" description="Renforcez vos muscles en profondeur, améliorez votre posture et gagnez en souplesse grâce à des mouvements doux mais redoutablement efficaces."/>
            <ActivityDescription title="Abdos flash" illustration="/images/plannings/zap.svg" path="/tarifs/boost" description="Un cours express et intense pour sculpter votre sangle abdominale en un minimum de temps. Résultats garantis !"/>
            <ActivityDescription title="Zumba" illustration="/images/plannings/dance.svg" path="/tarifs/danse" description="Dansez, transpirez et amusez-vous ! Un mix explosif de rythmes latinos et de cardio qui fait brûler des calories sans s’en rendre compte."/>
            <ActivityDescription title="CAF" illustration="/images/plannings/leg.svg" path="/tarifs/boost" description="Cuisse, Abdos, Fessiers : le trio gagnant pour tonifier le bas du corps, brûler un maximum de calories et galber la silhouette."/>
            <ActivityDescription title="Pump" illustration="/images/plannings/weight.svg" path="/tarifs/boost" description="Un entraînement avec charges inspiré de la musculation pour brûler les graisses et vous sculpter un corps puissant et athlétique."/>
            <ActivityDescription title="Cross training" illustration="/images/plannings/weight.svg" path="/tarifs/boost" description="Un condensé explosif de cardio, force et agilité. Variez les exercices pour repousser vos limites et booster vos performances."/>
            <ActivityDescription title="Step" illustration="/images/plannings/stairs.svg" path="/tarifs/boost" description="Un cours chorégraphié fun et dynamique sur step qui combine cardio et renforcement pour affiner la silhouette en s’amusant."/>
            <ActivityDescription title="Fessiers flash" illustration="/images/plannings/zap.svg" path="/tarifs/boost" description="15 minutes d’exercices ciblés et ultra efficaces pour raffermir et sculpter vos fessiers rapidement."/>
            <ActivityDescription title="RPM" illustration="/images/plannings/bike_exercise.svg" path="/tarifs/boost" description="En selle pour un cours de vélo indoor explosif ! Dépense calorique maximale, sensations fortes et dépassement de soi garantis."/>
            <ActivityDescription title="Cardio Boxe" illustration="/images/plannings/fist.svg" path="/tarifs/aqua" description="Un mix parfait entre boxe et cardio pour se défouler, brûler des calories et libérer tout son stress dans une ambiance survoltée."/>
            <ActivityDescription title="Boxe française" illustration="/images/plannings/fist.svg" path="/tarifs/boost" description="Découvrez la discipline élégante et technique de la savate : un sport complet qui développe puissance, vitesse et coordination."/>
            <ActivityDescription title="Stretch" illustration="/images/plannings/yoga.svg" path="/tarifs/boost" description="Un moment de détente et de mobilité pour étirer vos muscles, relâcher les tensions et améliorer votre souplesse au quotidien."/>
            <ActivityDescription title="PPG" illustration="/images/plannings/weight.svg" path="/tarifs/boost" description="La préparation physique générale : des exercices complets pour développer endurance, force et explosivité, quel que soit votre niveau."/>

            </div>
        </PageStructure>
    );
}