import Clickable from "@/components/ui/clickable"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function EssaiOffert() {
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
            {/* <div className="w-full h-[5vh] bg-gradient-to-b from-background-base to-accent"/> */}
            <div className="relative w-full bg-background-highlight p-content lg:px-contentLg flex flex-col items-center space-y-content">
                <h3 className="text-foreground-base text-center flex flex-col items-center space-y-10">
                    <span className="text">Viens essayer</span>
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="logo outline-[0.25rem] outline-offset-[2rem] w-30 object-cover" 
                    />
                    <span className="text">gratuitement et sans engagement</span>
                </h3>
                <Clickable
                    clickableType={{type: "link", path: "/offert"}}
                    style={{"variant": "action", "color": "accent"}}
                    className="bouton z-10"
                >
                    Essai Offert
                </Clickable>

                {/* Fond hall b */}
                <div className="absolute inset-0 overflow-hidden flexCenter p-content">
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="max-h-full w-auto opacity-10"
                    />
                </div>
            </div>
            {/* <div className="w-full h-[5vh] bg-gradient-to-t from-background-base to-accent"/> */}
            </div>
        </section>
    );
}