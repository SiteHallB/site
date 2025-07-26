import Clickable from "@/components/ui/clickable"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function SeanceGratuite() {
    const container = useRef<HTMLDivElement>(null)

    // Bouton qui clignote
    useGSAP(() => {
        gsap.to(".bouton", {
            scale: 1.05,
            duration: 1,   
            ease: "power2.in", 
            yoyo: true, 
            repeat: -1
        })
    }, { scope: container })

    // Hall b qui rétrécit et laisse place au texte
    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".trigger", 
                start: () => "top 40%", 
                toggleActions: "resume none none reset", 
            }
        })
        .from(".logo", {
            scale: 2.5, 
            yPercent: 50, 
            ease: "back"
        })
        .from(".text", {
            autoAlpha: 0, 
            ease: "power3.inOut"
        }, "<")
    }, { scope: container })

    return (
        <section ref={container} id="seance-gratuite" className="w-full bg-background-base pb-subSection">
            <span className="trigger">
            <div className="w-full h-[5vh] bg-gradient-to-b from-background-base to-accent"/>
            <div className="w-full bg-accent p-content flex flex-col items-center space-y-content">
                <h2 className="text-foreground-base text-center flex flex-col items-center space-y-2">
                    <span className="text">Viens essayer</span>
                    <Image
                        src="/images/logo-hallb.png"
                        alt="Logo Hall B"
                        width={1240}
                        height={1328}
                        className="logo w-20 object-cover"
                    />
                    <span className="text">gratuitement et sans engagement</span>
                </h2>
                <Clickable
                    clickableType={{type: "link", path: ""}}
                    style={{"variant": "action", "color": "background"}}
                    className="bouton"
                >
                    Séance gratuite
                </Clickable>
                <p className="text-foreground-subdued">Conditions de l'offre</p>
            </div>
            <div className="w-full h-[5vh] bg-gradient-to-t from-background-base to-accent"/>
            </span>
        </section>
    );
}