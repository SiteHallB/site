"use client"

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Formule() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".image", {
            opacity: 1, 
            scale: 0.5, 
            rotation: 45
        })

        gsap.to(".image", {
            scrollTrigger: {
                trigger: ".image", 
                toggleActions: "restart none none none", 
                markers: true
            }, 
            duration: 1, 
            stagger: 1,  
            scale: 1, 
            rotation: 0, 
        })
    }, { scope: container });

    return (
        <div
            ref={container}
            className="relative flex flex-col bg-background-highlight w-full h-[80vh] rounded-xl px-3 py-5 items-center justify-around space-y-5"
        >
            {/* Prix */}
            <div className="px-2 font-futuretense flex items-center justify-center absolute left-[-0.5rem] top-[-0.9rem] rounded-xs bg-accent">
                <p className="text-base">40€<span className="text-[0.7rem]">/mois</span></p>
            </div>

            {/* Titre */}
            <div className="mb-auto flex flex-col items-center">
                <h2 className="title text-foreground-base mx-auto">
                    Classic
                </h2>
                <p className="text-foreground-subdued mb-4 subtitle">
                    Muscu & Cardio accès libre
                </p>
            </div>

            {/* Images */}
            <div className="relative w-full h-full rounded-xl">
                <div className="opacity-0 z-10 absolute inset-0 image rounded-xl flex items-center justify-center overflow-hidden">
                    <Image 
                        src="/images/concept.jpg"
                        width={3024}
                        height={4032}
                        className="object-cover"
                        alt=""
                    />
                </div>
                <div className="opacity-0 z-20 absolute m-auto inset-0 image rounded-xl flex items-center justify-center overflow-hidden">
                    <Image 
                        src="/images/histoire.jpg"
                        width={3024}
                        height={4032}
                        className="object-cover"
                        alt=""
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-3">
                    <CheckCheck size={24} className="text-accent shrink-0"/>
                    <p className="text-foreground-base readable">Accès 7jours/7 de 7h à 23h au plateau muscu/cardio</p>
                </div>
                <div className="flex flex-row space-x-3">
                    <CheckCheck size={24} className="text-accent"/>
                    <p className="text-foreground-base readable">Autre truc à dire</p>
                </div>
            </div>

            {/* Bouton */}
            <div className="text-xl text-foreground-base">
                Action
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div className="bg-background-base w-full px-content">
            <div className="py-18 flex flex-col w-full space-y-5 items-center">
                <p className="mt-5 text-foreground-subdued title-long text-center">
                    Des
                    <span className="menu text-foreground-base"> tarifs</span> adaptés à tous les
                    <span className="text-foreground-base"> pratiquants</span>, tous les
                    <span className="text-foreground-base"> goûts</span> et
                    <span className="text-foreground-base"> projets</span>.
                </p>

                <p className="explanation text-foreground-subdued text-center">
                    Explication possiblement détaillée sur comment les abonnement marchent
                </p>
                
                <Formule/>

                {/* Exemple */}
                <div className="bg-background-highlight w-full h-[80vh] rounded-xl p-2">
                    <h2 className="title text-foreground-base">
                        Boost
                    </h2>
                </div>
            </div>
            
        </div>
    );
}