"use client"

import type { ImageType } from "@/context/image-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

export type HistoireData = {
    titre: string;
    intro: React.ReactNode;
    image: ImageType;
    texte: React.ReactNode;
};

export default function Histoire({ data }: { data: HistoireData }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // Entre dans l'image et fait apparaitre le texte dessous
        gsap.timeline({
            scrollTrigger: {
                trigger: ".imageClip",
                start: () => "top 30%",
                end: () => "top top",
                scrub: 0.8,
            }
        })
        .to(".imageClip", {
            width: () => "100%",
            height: () => "100%",
            borderRadius: 0
        })
        .to(".descriptionText", {
            autoAlpha: 1,
            ease: "power4.in"
        }, "<")
        .to(".fadeText", {
            autoAlpha: 0,
            ease: "power3.out"
        }, "<")
    }, { scope: container })

    return (
        <section ref={container} id="histoire" className="bg-background-base pb-subSection">
            <div className="scrollSection w-full flex flex-col items-center">
                <h2 className="text-foreground-base text-center mb-subTitle">
                    {data.titre}
                </h2>
                <div className="fadeText text-foreground-subdued px-content lg:px-contentLg mb-content">
                    {data.intro}
                </div>
                {/* Image */}
                <div className="relative w-full h-[80vh] flexCenter mb-content overflow-hidden">
                    <div
                        className="imageClip absolute top-0 overflow-hidden rounded-3xl size-[40vh]"
                        style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}
                    >
                        <Image
                            {...data.image}
                            className="absolute left-0 top-0 size-full object-cover"
                        />
                    </div>
                </div>
                <span className="descriptionText px-content lg:px-contentLg">
                    <div className="text-foreground-subdued">{data.texte}</div>
                </span>
            </div>
        </section>
    );
}
