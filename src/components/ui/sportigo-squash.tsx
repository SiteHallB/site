"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoSquash() {
    const data = {
        theme: {
            dark: true,
            googleFont: {
                name: 'Montserrat',
                family: 'sans-serif'
            },
            cssFile: '/css/sportigo-squash.css',
        }
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent('Racket', 'sportigoSquashPlanning', '4c334b6f-305e-413a-8541-355479dc0286', {id: 2837, ...data})
        }
    };

    // Au premier montage (refresh ou navigation), on tente un init immédiat
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <section id="sportigoSquashPlanning" className="w-full"></section>
            <Script
                src="https://standalone.api.sportigo.fr/component-standalone.js"
                strategy="afterInteractive"
                onLoad={init} 
            />
        </>
    );
}
