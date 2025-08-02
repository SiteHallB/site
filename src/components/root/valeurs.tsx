import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Separator from "../ui/separator";
import { useImage } from "@/context/image-context";

gsap.registerPlugin(ScrollTrigger);

export default function Valeurs() {
    const container = useRef<HTMLDivElement>(null);

    const { root_valeurs } = useImage();

    useGSAP(() => {
        gsap.from(".textValeurs", {
            scrollTrigger: {
                trigger: ".textValeursHolder", 
                start: () => "top 70%", 
                end: () => "bottom 40%", 
                toggleActions: "play reverse play reverse",
            }, 
            stagger: 0.1, 
            yPercent: 130,
            autoAlpha: 0, 
            ease: "back",
        })

        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    })

    return (
        <div ref={container} className="w-full bg-background-base lg:px-40 pb-subSection">
            <div className="w-full bg-background-subdued py-content flex flex-col">
            <h2 className="z-10 notreHistoire text-foreground-base text-center mb-subTitle">
                Nos Valeurs
            </h2>
            {/* Contenu de la section */}
            <div className="flex flex-col lg:flex-row lg:px-20 space-x-content">
                <div className="flexCenter w-full mb-content">
                <div className="max-w-full aspect-square lg:max-w-150 overflow-hidden flexCenter">
                    <Image 
                        {...root_valeurs}
                        className="min-w-full min-h-full object-center object-cover"
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