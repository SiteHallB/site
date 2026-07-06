"use client"

import PageStructure from "@/components/ui/page-structure";
import type { ImageType } from "@/context/image-context";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ActivityDescription from "./activity-description";
import Separator from "../ui/separator";

export type PlanningSection = {
    titre: string;
    imageBureau?: ImageType;
    jours: ImageType[];
};

export type PlanningsData = {
    titre: string;
    sousTitre: string;
    sections: PlanningSection[];
    activites: { titre: string; illustration: string; url: string; description: string }[];
};

function FullPlannings({ title, desktop, jours }: { title: string; desktop: ImageType; jours: ImageType[] }) {
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
                {jours.map((image, index) => (
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

function SimplePlanning({ title, image }: { title: string; image: ImageType }) {
    return (
        <div className="w-full flex flex-col items-center gap-content">
            <h2 className="text-center">{title}</h2>
            <div className="bg-background-highlight rounded-xl w-full p-1 max-w-120">
                <img {...image}/>
            </div>
        </div>
    );
}

export default function Plannings({ data }: { data: PlanningsData }) {
    return (
        <PageStructure title={data.titre} subtitle={<p>{data.sousTitre}</p>}>
            {data.sections.map((section, index) => {
                if (section.imageBureau && section.jours.length > 0) {
                    return (
                        <FullPlannings
                            key={index}
                            title={section.titre}
                            desktop={section.imageBureau}
                            jours={section.jours}
                        />
                    );
                }
                const image = section.imageBureau ?? section.jours[0];
                if (!image) return null;
                return <SimplePlanning key={index} title={section.titre} image={image}/>;
            })}

            {data.activites.length > 0 && (
                <>
                    <Separator/>

                    <div className="w-full lg:px-50 px-contentLg gap-10 py-10 lg:py-20 flex flex-col lg:grid grid-cols-2">
                        {data.activites.map((activite, index) => (
                            <ActivityDescription
                                key={index}
                                title={activite.titre}
                                illustration={activite.illustration}
                                path={activite.url}
                                description={activite.description}
                            />
                        ))}
                    </div>
                </>
            )}
        </PageStructure>
    );
}
