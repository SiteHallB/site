"use client"

import PageStructure from "@/components/ui/page-structure";
import SportigoPlannings from "@/components/plannings/sportigo-plannings";
import Image from "next/image";
import { useImage } from "@/context/image-context";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Clickable from "@/components/ui/clickable";
import ActivityDescription from "./activity-description";
import Separator from "../ui/separator";

export default function Plannings() {
    const { plannings_desktop, plannings_lundi, plannings_mardi, plannings_mercredi, plannings_jeudi, plannings_vendredi, plannings_samedi, plannings_danse } = useImage();
    return (
        <PageStructure title="Plannings" subtitle={<p>Consultez nos nombreuses activités</p>}>
            {/* Plannings Sportigo */}
            {/* <div className="bg-white rounded-xl w-full overflow-x-hidden pt-1 flexCenter">
                <SportigoPlannings />
            </div> */}

            {/* Images */}
            <div className="bg-background-highlight rounded-xl w-full p-1 hidden lg:flex justify-center">
                <Image {...plannings_desktop}/>
            </div>

            <div className="w-full block lg:hidden">
            <Swiper
                className="w-full"
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={-50}
                slidesPerView={1.3}
                centeredSlides
                navigation
                pagination={{ clickable: true }}
            >
                {[plannings_lundi, plannings_mardi, plannings_mercredi, plannings_jeudi, plannings_vendredi, plannings_samedi ].map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="select-none overflow-hidden rounded transition-all duration-300 ease-in-out swiper-slide-custom"
                    >
                        <Clickable
                            clickableType={{type: "button", onClick: () => window.dispatchEvent(new CustomEvent("open-popup"))}}
                            style={{}}
                        >
                        <Image
                            {...image}
                            className="w-full h-full object-cover object-center"
                        />
                        </Clickable>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>

            <div className="bg-background-highlight rounded-xl w-full p-1 flexCenter max-w-120">
            <Image
                {...plannings_danse}
            />
            </div>

            <Separator/>
            
            <div className="w-full px-contentLg gap-10 py-10 lg:py-20 flex flex-col lg:grid grid-cols-2">
            <ActivityDescription title="Aqua Tonic" illustration="/images/plannings/aqua.svg" path="/tarifs/aqua" description="Une description"/>
            <ActivityDescription title="Aqua Bike" illustration="/images/plannings/bike.svg" path="/tarifs/boost" description="Une description"/>
            <ActivityDescription title="Yoga" illustration="/images/plannings/yoga.svg" path="/tarifs/boost" description="Une description"/>
            <ActivityDescription title="Pilate" illustration="/images/plannings/weight.svg" path="/tarifs/boost" description="Une description"/>
            </div>
        </PageStructure>
    );
}