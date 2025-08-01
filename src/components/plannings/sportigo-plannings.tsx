"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoPlannings() {
    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent(
                "Appointment",
                "sportigo-container",
                "4c334b6f-305e-413a-8541-355479dc0286",
                { colored: true, readonly: true }
            );
        }
    };

    // Au premier montage (refresh ou navigation), on tente un init immédiat
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <div id="sportigo-container" className="w-full"/>
            <Script
                src="https://standalone.api.sportigo.fr/component-standalone.js"
                strategy="afterInteractive"
                onLoad={init} 
            />
        </>
    );
}
