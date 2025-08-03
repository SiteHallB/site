"use client";

import styles from "@/styles/components/Hero.module.css"

import { useRef } from "react";

import Image from "next/image";

import { ArrowDown } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import VideoBackground from "@/components/ui/video-background";
import Clickable from "@/components/ui/clickable";

import { useImage } from "@/context/image-context";
import { useLinks } from "@/context/link-context";

type BandElement = { text: string, path: string }

function FlashingBand({ items }: { items: BandElement[] }) {
    const container = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        if (!container.current) return;
        const bandElements = container.current.querySelectorAll(".bandElement");

        const tl = gsap.timeline({ repeat: -1 })
        bandElements.forEach((el, _) => {
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
        <ul ref={container} className="flex flex-wrap gap-x-4 justify-center">
            {items.map((el, index) => (
                <li key={index}>
                    <Clickable
                        clickableType={{type: "link", path: el.path}}
                        style={{}}
                        className="hoverUnderline bandElement textLead text-foreground-subdued"
                    >
                        {el.text}
                    </Clickable>
                </li>
            ))}
        </ul>
  );
}

function Arrow({ }) {
    return (
        <Clickable 
            clickableType={{type: "button", onClick: () => {const vh = window.innerHeight; window.scrollTo({top: 4*vh/5, behavior: "smooth"})}}}
            style={{}}
            aria-label="Aller au contenu"
            className="absolute bottom-20"
        >
            <ArrowDown
                className={["parallaxArrow text-foreground-subdued", styles.arrowBounce].join(" ")}
            />
        </Clickable>
    );
}

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    const { logo } = useImage();

    const { osteo } = useLinks();

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
        <section id="hero" ref={container} aria-label="Présentation" className="relative w-full min-h-screen">
            {/* Vidéo */}
            <div className="absolute inset-0">
                <VideoBackground className="block md:hidden" videoUrl="https://vz-80ca2e5b-6ca.b-cdn.net/bb9a19b0-def3-4598-9efa-f9a93cf7f6c7/playlist.m3u8" poster=""/>
                <VideoBackground className="hidden md:block" videoUrl="https://vz-80ca2e5b-6ca.b-cdn.net/5d676075-41e1-410d-9582-bac89110c43b/playlist.m3u8" poster=""/>
            </div>

            {/* Texte */}
            <div className="relative z-10 w-full min-h-screen parallaxText px-content lg:px-contentLg flex flex-col items-center justify-around pt-20 pb-20">
                {/* Titre */}
                <div className="flexCenter flex-col space-y-2">
                    <Image
                        {...logo}
                        className="h-[6rem] w-auto"
                        priority
                    />
                    <h1 className={"text-foreground-base textNormal"}>
                        La plus grande salle de sport du Gard
                    </h1>
                </div>
                
                {/* Bandeau clignotant */}
                <FlashingBand
                    items={[
                    { path: "/tarifs/classic", text: "Musculation" }, 
                    { path: "/tarifs/boost", text: "Fitness" }, 
                    { path: "/tarifs/aqua", text: "Aqua" }, 
                    { path: "/squash", text: "Squash" }, 
                    { path: osteo, text: "Osteo" }, 
                    { path: "/tarifs/danse", text: "Danse" }, 
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