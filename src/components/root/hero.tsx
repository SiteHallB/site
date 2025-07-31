"use client";

import "@/styles/accueil-degrade.css"

import { useRef } from "react";

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
            <Clickable 
                clickableType={{type: "button", onClick: () => {const vh = window.innerHeight; window.scrollTo({top: 4*vh/5, behavior: "smooth"})}}}
                style={{}}
            >
                <ArrowDown className="parallaxArrow arrow text-foreground-subdued"/>
            </Clickable>
        </div>
    );
}

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    // Parallax
    useGSAP(() => {
        const amount = 60;
        gsap.timeline({
            scrollTrigger: {
                trigger: ".parallaxFill", 
                start: () => "bottom bottom", 
                end: () => "bottom top", 
                scrub: 0.5, 
            }, 
        })
        .to(".parallaxArrow", {
            autoAlpha: 0, 
            duration: 0.07
        })
        .to(".parallaxGradient", {
            y: `-${amount-1}vh`, 
        }, "<")
        .to(".parallaxFill", {
            clipPath: `polygon(0% ${100-amount}%, 100% ${100-amount}%, 100% 100%, 0% 100%)`
        }, "<")
        .to(".parallaxText", {
            y: `-${amount/3}vh`, 
        }, "<")
    }, { scope: container })
    
    return (
        <section id="hero" ref={container} className="relative w-full min-h-screen">
            {/* Vidéo */}
            <div className="absolute inset-0">
            <VideoBackground videoId="Tdrz5LPy-Vk"/>
            </div>

            {/* Texte */}
            <div className="relative z-10 w-full min-h-screen parallaxText px-content lg:px-contentLg flex flex-col items-center justify-around pt-20 pb-20">
                {/* Titre */}
                <div className="flexCenter flex-col space-y-2">
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="h-[6rem] w-auto"
                        priority
                    />
                    <h1 className={"text-foreground-subdued textNormal"}>
                        La plus grande salle de sport du Gard
                    </h1>
                </div>
                
                {/* Bandeau clignotant */}
                <FlashingBand
                    items={[
                    { path: "", text: "Musculation" }, 
                    { path: "", text: "Fitness" }, 
                    { path: "", text: "Aqua" }, 
                    { path: "/squash", text: "Squash" }, 
                    { path: "", text: "Osteo" }, 
                    { path: "", text: "Danse" }, 
                    ]}
                />

                {/* Boutons */}
                <div className="flexCenter flex-col space-y-2">
                    <Clickable
                        clickableType={{type:"link", path: "/offert"}}
                        style={{variant: "page", color: "primary"}}
                    >
                        Séance d'essai offerte
                    </Clickable>
                    <Clickable
                        clickableType={{type:"link", path: "/tarifs"}}
                        style={{variant: "page", color: "accent"}}
                    >
                        Je m'inscris
                    </Clickable>
                </div>

                {/* Flèche */}
                <Arrow/>
            </div>
            {/* Dégradé */}
            <div className="parallaxGradient z-0 inset-x-0 top-[60vh] absolute w-full h-[40vh] bg-gradient-to-t from-background-base to-transparent"/>
            <div
                className="parallaxFill z-0 absolute inset-x-0 top-0 h-screen bg-background-base flex flex-row justify-center transform-gpu [will-change:clip-path]"
                style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
            </div>
            {/* Fond en plus au cas ou les boutons dépassent de l'écran */}
            <div className="absolute inset-x-0 top-[100vh] bottom-0 bg-background-base"/>
        </section>
    );
}