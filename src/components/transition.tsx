"use client"

import "@/styles/transition.css"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Transition() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.timeline()
        .to(".transition-screen", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            duration: 0.3, 
            ease: "power1.inOut"
        })
        .to(".transition-screen", {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", 
            duration: 0.6, 
            ease: "power3.inOut"
        })
    })

    return (
        <div ref={container} className="transition-screen fixed inset-0 bg-background-base z-50">

        </div>
    );
}