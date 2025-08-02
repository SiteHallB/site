"use client"

import { CheckCheck, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from "swiper/modules";
import Clickable from "@/components/ui/clickable";

import type { Swiper as SwiperInstance } from "swiper";

import { ImageType } from "@/context/image-context";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type FormuleProps = 
    { title: string } &
    { subtitle: string } &
    { prix?: number } &
    { images: ImageType[] } &
    { checkDescription: React.ReactNode[] } &
    { plusDescription: React.ReactNode[] } &
    { actionLink: string } &
    { className?: string };

function Check({ checkDesciption, icon }: { checkDesciption: React.ReactNode, icon?: "plus" | "check" }) {
    return (
        <div className="flex flex-row space-x-3">
            {icon === "plus" ? <PlusCircle className="size-5 text-accent shrink-0 check"/> : <CheckCheck className="size-5 text-accent shrink-0 check"/>}
            <p className="text-foreground-subdued text-[14px]">
                {checkDesciption}
            </p>
        </div>
    );
}

export default function FormuleOverview({ title, subtitle, prix, images, checkDescription, plusDescription, actionLink, className }: FormuleProps ) {
    const container = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperInstance>(null);
    const intervalRef = useRef<number>(0);

    const tick = () => {
        if (!swiperRef.current) return; 
        const totalSlides = swiperRef.current.slides.length;
        const activeSlide = swiperRef.current.activeIndex;
        if (activeSlide === totalSlides - 1) swiperRef.current.slideTo(0);
        else swiperRef.current.slideTo(activeSlide + 1);
    };

    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(tick, 3000);
    }

    useEffect(() => {
        if (images.length === 1) return;
        startTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        };
    }, []);
    
     // Check animation
    useGSAP(() => {
        gsap.to(".check", {
            scale: 1.6, 
            ease: "power3.out", 
            stagger: {
                each: 0.5, 
                repeat: 1, 
                yoyo: true, 
                yoyoEase: "power1.out", 
            }, 
            scrollTrigger: {
                trigger: ".check-holder", 
                start: "top 70%", 
                end: "bottom 50%", 
                toggleActions: "play reset play reset"
            }
        })
    }, { scope: container })



    return (
        <div ref={container} className={clsx(className, "relative max-w-90 w-full flex flex-col bg-background-highlight rounded-xl px-contentClose lg:px-content py-content items-center justify-around space-y-contentClose")}>
            {/* Prix */}
            {prix && <div className="px-contentClose flex items-center justify-center absolute left-[-0.5rem] top-[-1.1rem] rounded-xs bg-accent">
                <p className="text-[20px] font-futuretense"><span className="textSmall">A partir de </span>{prix}€<span className="textSmall">/mois</span></p>
            </div>}

            {/* Titre */}
            <div className="flex flex-col items-center w-full text-center">
                <h2 className="text-foreground-base text-[20px]">{title}</h2>
                <p className="textSubH2 text-foreground-subdued">{subtitle}</p>
            </div>

            {/* Images */}
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={startTimer}
                className="w-full h-[30vh]"
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={-50}
                slidesPerView={1.3}
                centeredSlides
                navigation
                pagination={{ clickable: true }}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="select-none overflow-hidden rounded transition-all duration-300 ease-in-out swiper-slide-custom"
                    >
                        <Image
                            {...image}
                            className="w-full h-full object-cover object-center"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Check description */}
            <div className="flex flex-col check-holder w-full">
                {checkDescription.map((el, i) => (
                    <Check 
                        key={i}
                        checkDesciption={el}
                    />
                ))}
                {plusDescription.map((el, i) => (
                    <Check 
                        icon="plus"
                        key={i}
                        checkDesciption={el}
                    />
                ))}
            </div>

            {/* Bouton */}
            <Clickable
                clickableType={{type:"link", onClick: () => 0, path: actionLink}}
                style={{variant: "action", color: "accent"}}
            >
                En savoir plus
            </Clickable>
        </div>
    );
}