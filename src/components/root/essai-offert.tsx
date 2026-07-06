"use client"

import Clickable from "@/components/ui/clickable"
import type { ImageType } from "@/context/image-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export type EssaiOffertData = {
    ligne1: string;
    ligne2: string;
    bouton: { texte: string; url: string };
    logo: ImageType;
};

export default function EssaiOffert({ data }: { data: EssaiOffertData }) {
    const container = useRef<HTMLDivElement>(null)

    // Bouton qui clignote
    useGSAP(() => {
        gsap.to(".bouton", {
            scale: 1.1,
            duration: 0.9,
            ease: "power2.in",
            yoyo: true,
            repeat: -1
        })
    }, { scope: container })

    // Hall b qui rétrécit et laisse place au texte
    useGSAP(() => {
        gsap.timeline({scrollTrigger: {
            trigger: ".trigger",
            start: () => "top 40%",
            end: () => "bottom 40%",
            toggleActions: "play reverse play reverse",
        }})
        .from(".logo", {
            scale: 2,
            yPercent: 10,
            ease: "back"
        })
        .from(".text", {
            autoAlpha: 0,
            ease: "power3.inOut"
        }, "<")
    }, { scope: container })

    return (
        <section ref={container} id="seance-gratuite" className="w-full bg-background-base mb-subSection">
            <div className="trigger">
            <div className="relative w-full bg-background-highlight p-content lg:px-contentLg flex flex-col items-center space-y-content">
                <h3 className="text-foreground-base text-center flex flex-col items-center space-y-10">
                    <span className="text">{data.ligne1}</span>
                    <Image
                        {...data.logo}
                        className="logo h-auto outline-[0.25rem] outline-offset-[2rem] w-30 object-cover"
                    />
                    <span className="text">{data.ligne2}</span>
                </h3>
                <Clickable
                    clickableType={{type: "link", path: data.bouton.url}}
                    style={{"variant": "action", "color": "accent"}}
                    className="bouton z-10"
                >
                    {data.bouton.texte}
                </Clickable>

                {/* Fond hall b */}
                <div className="absolute inset-0 overflow-hidden flexCenter p-content">
                    <Image
                        {...data.logo}
                        className="max-h-full max-w-full aspect-square w-auto opacity-10"
                    />
                </div>
            </div>
            </div>
        </section>
    );
}
