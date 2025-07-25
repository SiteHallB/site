"use client";

import "@/styles/accueil-degrade.css"

import { useRef, useCallback } from "react";

import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ArrowDown } from "lucide-react";

import VideoBackground from "@/components/ui/video-background";
import Clickable from "@/components/ui/clickable";

type BandElement = { text: string, path: string }

function FlashingBand({ items }: { items: BandElement[] }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current) return;
        const bandElements = container.current.querySelectorAll(".bandElement");

        const tl = gsap.timeline({ repeat: -1 })
        bandElements.forEach((el, index) => {
            tl.to(el, {
                color: "#E1C340", 
                yoyo: true, 
                repeat: 1, 
                ease: "power1.out"
            })
        })
        tl.duration(5)
    }, { scope: container })

    return (
        <div ref={container} className="flex flex-wrap gap-x-4 justify-center">
            {items.map((el, index) => (
                <div key={index} className="">
                    <Clickable
                        clickableType={{type: "link", path: el.path}}
                        style={{}}
                        className="bandElement textLead text-foreground-subdued opacity-80"
                    >
                        {el.text}
                    </Clickable>
                </div>
            ))}
        </div>
  );
}

function Arrow({ }) {
    const container = useRef<HTMLDivElement>(null);

    // Rebonds
    useGSAP(() => {
        gsap.to(".arrow", {
            y: 10, 
            ease: "power2.in", 
            yoyo: true, 
            repeat: -1
        })
    }, { scope: container })

    return (
        <div ref={container} className="absolute bottom-20">
            <ArrowDown size={24} className="parallaxArrow arrow text-foreground-subdued"/>
        </div>
    );
}

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    // // Parallax
    // useGSAP(() => {
    //     const amount = 60;
    //     gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ".parallaxFill", 
    //             start: () => "bottom bottom", 
    //             end: () => "bottom top", 
    //             scrub: true, 
    //         }, 
    //     })
    //     .to(".parallaxArrow", {
    //         clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
    //         duration: 0.07
    //     })
    //     .to(".parallaxGradient", {
    //         y: `-${amount-1}vh`, 
    //     }, "<")
    //     .to(".parallaxFill", {
    //         clipPath: `polygon(0% ${100-amount}%, 100% ${100-amount}%, 100% 100%, 0% 100%)`
    //     }, "<")
    //     .to(".parallaxText", {
    //         y: `-${amount/3}vh`, 
    //     }, "<")
    // }, { scope: container })
    
    return (
        <section id="hero" ref={container} className="relative w-full h-[100vh]">
            {/* Vidéo */}
            <div className="absolute inset-0">
            <VideoBackground id="Presentation"/>
            </div>

            {/* Texte */}
            <div className="parallaxText absolute inset-0 px-content z-20 flex flex-col items-center justify-around pt-20 pb-20">
                {/* Titre */}
                <div className="flexCenter flex-col space-y-2">
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="h-[6rem] w-auto"
                    />
                    <p className={"text-foreground-subdued"}>
                        Un bon sous-titre
                    </p>
                </div>
                
                {/* Bandeau clignotant */}
                <FlashingBand
                    items={[
                    { path: "", text: "Musculation" }, 
                    { path: "", text: "Fitness" }, 
                    { path: "", text: "Aqua" }, 
                    { path: "", text: "Squash" }, 
                    { path: "", text: "Osteo" }, 
                    { path: "", text: "Danse" }, 
                    ]}
                />

                {/* Boutons */}
                <div className="flexCenter flex-col space-y-2">
                    <Clickable
                        clickableType={{type:"link", onClick: () => 0, path: ""}}
                        style={{variant: "page", color: "primary"}}
                    >
                        Séance d'essai offerte
                    </Clickable>
                    <Clickable
                        clickableType={{type:"link", onClick: () => 0, interfaceId: "Subscribe"}}
                        style={{variant: "page", color: "accent"}}
                    >
                        Je m'inscris
                    </Clickable>
                </div>

                {/* Flèche */}
                <Arrow/>
            </div>
            {/* Dégradé */}
            <div className="parallaxGradient inset-x-0 top-[60vh] absolute z-10 w-full h-[40vh] bg-gradient-to-t from-background-base to-transparent"/>
            <div className="parallaxFill absolute inset-0 bg-background-base" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);" }}/>
        </section>
    );
}