"use client";

import "@/styles/accueil-degrade.css"

import { useRef, useCallback } from "react";

import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowDown } from "lucide-react";

import LinkedButton from "@/components/ui/linked-buttons";
import VideoBackground from "@/components/ui/video-background";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

type BandObject = {
  text: string, 
  link: string, 
}

function FlashingBand({ objects }: { objects: BandObject[] }) {
  const toAnimate = useRef<HTMLDivElement[]>([]);
  const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
    if (!el || toAnimate.current.includes(el)) return;
    toAnimate.current.splice(index, 0, el);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 })
    toAnimate.current.forEach((el, index) => {
      tl.to(el, {
        color: "#E1C340", 
        yoyo: true, 
        repeat: 1, 
        ease: "power1.out"
      })
    })
    tl.duration(5)
  })

  return (
    <div className="uppercase font-futuretense text-lg text-foreground-subdued opacity-80 flex flex-wrap justify-center gap-x-4">
      {objects.map((el, i) => (
        <div ref={(e) => addToRefs(e, i)} key={i}>
          <Link href={el.link}>
            {el.text}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    
    // Parallax sur vidéo
    useGSAP(() => {
        const amount = 60;
        gsap.timeline({
            scrollTrigger: {
                trigger: ".parallax-gradient", 
                start: "top 60%", 
                end: "top top", 
                scrub: true, 
            }, 
        })
        .to(".arrow", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
            duration: 0.07
        })
        .to(".parallax-gradient", {
            y: `-${amount-1}dvh`, 
        }, "<")
        .to(".parallax-fill", {
            clipPath: `polygon(0% ${100-amount}%, 100% ${100-amount}%, 100% 100%, 0% 100%)`
        }, "<")
        .to(".parallax-text", {
            y: `-${amount/3}dvh`, 
        }, "<")
    }, { scope: container })
    
    // Texte qui apparait sous le premier parallax
    useGSAP(() => {
        const split = new SplitText(".split", {
        type: "words",
        });
    
        gsap.from(split.words, {
            scrollTrigger: {
                start: "top 75%", 
                end: "top 20%", 
                trigger: ".split", 
                toggleActions: "play reverse play reverse"
            }, 
            yPercent: 130,
            stagger: 0.05,
            ease: "power2.out",
            duration: 0.4
        });
    }, { scope: container });
    
    // Fleche scroll down qui clignote
    useGSAP(() => {
        gsap.to(".arrow", {
            y: 10, 
            ease: "power2.in", 
            yoyo: true, 
            repeat: -1
        })
    }, { scope: container })
    
    // Clique sur la fleche
    const { contextSafe } = useGSAP( {scope: container} )
    const onArrowClick = contextSafe(() => {
        gsap.to(window, {
            scrollTo: {
                y: "#title-valeurs",
                offsetY: 55, 
            }, 
            ease: "power2.inOut", 
            duration: 1.4
        })
    })
    
    return (
        <section id="hero" ref={container} className="relative h-dvh w-full">

            {/* Vidéo */}
            <div className="absolute inset-0">
            <VideoBackground id="Presentation"/>
            </div>

            {/* Dégradé */}
            <div>
            <div className="absolute inset-x-0 top-[60dvh] bottom-0 bg-gradient-to-t from-background-base to-transparent z-10 parallax-gradient"/>
            <div className="absolute size-full bg-background-base parallax-fill z-10">
                {/* Texte dessous */}
                <div className="absolute bottom-0 inset-x-0 flex flex-col items-center space-y-5 pb-4">
                <div className="pt-20 inline-flex overflow-hidden">
                    <p className="readable-big text-center text-2xl text-foreground-subdued split">
                        Venez découvrir ...
                    </p>
                </div>
                </div>
            </div>
            </div>
            
            {/* Texte écran d'accueil */}
            <div className="absolute inset-0 px-content z-20 flex flex-col items-center justify-around pt-20 pb-10 parallax-text">
                <div className="flex flex-col items-center space-y-2">
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="h-[6rem] w-auto"
                    />
                    <p className={"text-2xl text-foreground-subdued font-montserrat"}>
                        Un bon sous-titre
                    </p>
                </div>
                
                <FlashingBand
                    objects={[
                    { link: "", text: "Musculation" }, 
                    { link: "", text: "Fitness" }, 
                    { link: "", text: "Aqua" }, 
                    { link: "", text: "Squash" }, 
                    { link: "", text: "Osteo" }, 
                    { link: "", text: "Danse" }, 
                    ]}
                />

                <div className="flex flex-col items-center space-y-2">
                    <LinkedButton mode={{id: "FreeTrial"}} text="Séance d'essai offerte" className="text-center w-full text-foreground-base outline-foreground-base outline-1 py-2"/>
                    <LinkedButton mode={{id: "Subscribe"}} text="Je m'inscris" className="text-center w-full text-foreground-base outline-foreground-base outline-1 py-2"/>
                </div>

                <ArrowDown size={24} className="absolute bottom-4 text-foreground-subdued arrow" onClick={onArrowClick}/>
            </div>

        </section>
    );
}