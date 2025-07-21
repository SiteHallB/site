"use client"

import LinkedButton from "@/components/ui/linked-buttons";
import VideoBackground from "@/components/ui/video-background";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

export default function Home() {
  return (
    <div className="flex flex-col bg-background-base">
      <div className="relative h-screen w-full">

        {/* Vidéo */}
        <div className="absolute inset-0">
          <VideoBackground id="Presentation"/>
        </div>

        {/* Dégradé */}
        <div className="absolute inset-x-0 top-[60vh] bottom-0 bg-gradient-to-t from-background-base to-transparent z-10"/>

        {/* Texte écran d'accueil */}
        <div className="absolute inset-0 px-content z-20 flex flex-col items-center justify-around pt-20 pb-10">
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
        </div>
      </div>
      <div className="w-full h-[500px]">

      </div>
    </div>
  );
}