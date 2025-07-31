import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Separator from "../ui/separator";

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: "/images/concept.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/histoire.jpg", width: 3024, height: 4032, alt:"" }, 
    { src: "/images/valeurs.jpg", width: 3024, height: 4032, alt:"" }, 
]

export default function Valeurs() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".textValeurs", {
            scrollTrigger: {
                trigger: ".textValeursHolder", 
                start: () => "top 70%", 
                end: () => "top 15%", 
                toggleActions: "play reverse play reverse",
            }, 
            stagger: 0.1, 
            yPercent: 130,
            autoAlpha: 0, 
            ease: "back",
        })
    })

    return (
        <div ref={container} className="w-full bg-background-base lg:px-40 pb-subSection">
            <div className="w-full bg-background-subdued py-content flex flex-col">
            <h2 className="z-10 notreHistoire text-foreground-base text-center mb-subTitle">
                Nos Valeurs
            </h2>
            {/* Contenu de la section */}
            <div className="flex flex-col lg:flex-row lg:px-20">
                <div className="flexCenter w-full mb-content">
                <div className="max-w-full aspect-square lg:max-w-150 overflow-hidden flexCenter">
                    <Image 
                        src={images[0].src}
                        width={images[0].width}
                        height={images[0].height}
                        className="w-full object-center object-cover"
                        alt={images[0].alt}
                    />
                </div>
                </div>
                <div className="w-full flexCenter">
                    <div className="textValeursHolder flex flex-col items-center py-content gap-y-contentClose lg:gap-y-contentLg">
                    <h3 className="text-xl font-futuretense w-full text-center textValeurs text-foreground-base">Convivialité</h3>
                    <Separator/>
                    <h3 className="text-xl font-futuretense w-full text-center textValeurs text-foreground-base">Accompagnement</h3>
                    <Separator/>
                    <h3 className="text-xl font-futuretense w-full text-center textValeurs text-foreground-base">Entraide</h3>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}