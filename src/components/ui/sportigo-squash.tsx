"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoSquash() {
    const data = {
        theme: {
            dark: true,
        },
        source: {
            kind: "widget",
            ref: "appointment-full",
        },
        planning: 4645,
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent('AppointmentFull', 'sportigo-appointment-full-container', '4c334b6f-305e-413a-8541-355479dc0286', data)
        }
    };

    // Au premier montage (refresh ou navigation), on tente un init immédiat
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <div id="sportigo-appointment-full-container" className="w-full"></div>
            <Script
                src="https://standalone.api.sportigo.fr/component-standalone.js"
                strategy="afterInteractive"
                onLoad={init} 
            />
        </>
    );
}
