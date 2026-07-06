"use client";

import styles from "@/styles/components/Hero.module.css"

import { useRef } from "react";

import Image from "next/image";

import { ArrowDown } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import VideoBackground from "@/components/ui/video-background";
import Clickable from "@/components/ui/clickable";
import type { ImageType } from "@/context/image-context";

type BandElement = { texte: string, url: string, externe?: boolean }

export type HeroData = {
    titre: string;
    logo: ImageType;
    videoDesktop: string;
    videoMobile: string;
    posterDesktop: string;
    posterMobile: string;
    bandeau: BandElement[];
    boutons: { texte: string; url: string; style: "primary" | "accent" }[];
};

function FlashingBand({ items }: { items: BandElement[] }) {
    const container = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        if (!container.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bandElements = container.current.querySelectorAll(".bandElement");

        // Couleur d'accent définie par le thème du back-office.
        const accent = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-accent")
            .trim() || "#E1C340";

        const tl = gsap.timeline({ repeat: -1 })
        bandElements.forEach((el, _) => {
            tl.to(el, {
                color: accent,
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
                        clickableType={{type: "link", path: el.url, outside: el.externe === true}}
                        style={{}}
                        className="hoverUnderline bandElement textLead text-foreground-subdued"
                    >
                        {el.texte}
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
                className={["parallaxArrow will-change-opacity text-foreground-subdued", styles.arrowBounce].join(" ")}
            />
        </Clickable>
    );
}

export default function Hero({ data }: { data: HeroData }) {
    const container = useRef<HTMLDivElement>(null);

    // Parallax
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const amount = 60;
        gsap.timeline({
            scrollTrigger: {
                trigger: ".parallaxFill",
                start: () => "bottom bottom",
                end: () => "bottom top",
                scrub: 0.8,
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
                <VideoBackground className="block md:hidden" activeQuery="(max-width: 767.98px)" src={data.videoMobile} poster={data.posterMobile}/>
                <VideoBackground className="hidden md:block" activeQuery="(min-width: 768px)" src={data.videoDesktop} poster={data.posterDesktop}/>
            </div>

            {/* Texte */}
            <div className="relative z-10 w-full min-h-screen parallaxText will-change-transform px-content lg:px-contentLg flex flex-col items-center justify-around pt-20 pb-20">
                {/* Titre */}
                <div className="flexCenter flex-col space-y-2 w-full">
                    <Image
                        {...data.logo}
                        className="h-[9rem] lg:h-[15rem] w-auto"
                        priority
                    />
                    <h1 className={"text-foreground-base textNormal"}>
                        {data.titre}
                    </h1>
                </div>

                {/* Bandeau clignotant */}
                <FlashingBand items={data.bandeau}/>

                {/* Boutons */}
                <div className="flexCenter flex-col space-y-2">
                    {data.boutons.map((bouton, index) => (
                        <Clickable
                            key={index}
                            clickableType={{type:"link", path: bouton.url}}
                            style={{variant: "page", color: bouton.style}}
                        >
                            {bouton.texte}
                        </Clickable>
                    ))}
                </div>

                {/* Flèche */}
                <Arrow/>
            </div>
            {/* Dégradé */}
            <div className="parallaxGradient will-change-transform z-0 inset-x-0 top-[60vh] absolute w-full h-[40vh] bg-gradient-to-t from-background-base to-transparent"/>
            <div
                className="parallaxFill z-0 absolute inset-x-0 top-0 h-screen bg-background-base flex flex-row justify-center transform-gpu [will-change:clip-path]"
                style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
            </div>
            {/* Fond en plus au cas ou les boutons dépassent de l'écran */}
            <div className="absolute inset-x-0 top-[100vh] bottom-0 bg-background-base"/>
        </section>
    );
}
