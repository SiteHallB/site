"use client"

import "@/styles/menu.css"

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon, X } from 'lucide-react';
import LinkedButton from "@/components/ui/linked-buttons";

const links = [
    { label: "Accueil", path: "/"}, 
    { label: "Tarifs", path: "/tarifs"}, 
    { label: "Plannings", path: "/plannings"}, 
    { label: "Nous contacter", path: "/contact"}, 
];

export default function Menu() {
    const container = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

    const tl = useRef<gsap.core.Timeline | null>(null);
    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 60 });

        tl.current = gsap.timeline({ paused: true })
        .to(".menu-overlay", {
            duration: 1.25, 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
            y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power4.inOut", 
            delay: -0.75, 
        })
    }, { scope: container });

    useEffect(() => {
        if(!tl.current) return;
        isMenuOpen ? tl.current.play() : tl.current.reverse();
    }, [isMenuOpen]);

    // Désactive le scroll
    useEffect(() => {
        isMenuOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
        
        return () => { document.body.classList.remove("overflow-hidden"); };
    }, [isMenuOpen]);

    return (
        <div ref={container}>
            {/* Barre de navigation */}
            <div className="fixed top-0 left-0 w-screen flex justify-between items-center z-50 px-4 lg:px-8 py-1 bg-background-subdued/70">
                <Link href="/" className="" onClick={() => setIsMenuOpen(false)}>
                    <Image
                    src="/images/logo-hallb.png"
                    alt="Logo Hall B"
                    width={2363}
                    height={2363}
                    className="h-16 w-auto mr-2"
                    />
                </Link>
                <div className="flex space-x-4">
                    <LinkedButton id="Subscribe" text="Je m'inscris" onClick={() => setIsMenuOpen(false)}/>
                    <div onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} className="text-foreground-base"/> : 
                            <MenuIcon size={24} className="text-foreground-base"/>}
                    </div>
                </div>
            </div>

            {/* Overlay menu */}
            <div className="menu-overlay fixed z-40 inset-0 bg-background-subdued flex flex-col justify-between pb-30 pt-40 px-3">
                <nav>
                    {links.map((link, index) => (
                        <div className="menu-link-item" key={index}>
                            <div className="menu-link-item-holder" onClick={toggleMenu}>
                                <Link
                                    href={link.path}
                                    className="text-accent menu"
                                >
                                    {link.label}
                                </Link>
                            </div>
                        </div>
                    ))}
                </nav>
                <div className="flex flex-col text-foreground-base text-2xl">
                    <Link href=""> Instagram &#8599; </Link>
                    <Link href=""> Facebook &#8599; </Link>
                    <Link href=""> TikTok &#8599; </Link>
                </div>
            </div>
        </div>
    );
}