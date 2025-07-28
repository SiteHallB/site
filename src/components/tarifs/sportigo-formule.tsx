"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoFormule() {
    const data = {
        initOfferPayment: {
            id: 0,
            cancelable: false
        },
        redirectUrl: 'https://www.sportigo.io/thank-you',
        theme: {
            dark: false,
            googleFont: {
                name: 'Audiowide',
                family: 'serif'
            },
            cssFile: '',
        }
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent(
                'BuyFromList', 
                'ID_SECTION', 
                '4c334b6f-305e-413a-8541-355479dc0286', 
                data
            );
        }
    };

    // Au premier montage (refresh ou navigation), on tente un init immédiat
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <section id="ID_SECTION" className="w-full"></section>
            <Script
                src="https://standalone.api.sportigo.fr/component-standalone.js"
                strategy="afterInteractive"
                onLoad={init} 
            />
        </>
    );
}
