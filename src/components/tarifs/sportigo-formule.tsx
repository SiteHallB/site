"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function SportigoFormule({ id }: { id?: number }) {
    const data = {
        initOfferPayment: {
            id: id ? id : 0,
            cancelable: false
        },
        redirectUrl: '/merci',
        theme: {
            dark: true,
            googleFont: {
                name: 'Montserrat',
                family: 'sans-serif'
            },
            cssFile: '/css/sportigo-formule.css',
        }
    };

    const init = () => {
        if (typeof window.initComponent === "function") {
            window.initComponent(
                'BuyFromList', 
                'sportigoFormule', 
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
            <section id="sportigoFormule" className="w-full"></section>
            <Script
                src="https://standalone.api.sportigo.fr/component-standalone.js"
                strategy="afterInteractive"
                onLoad={init} 
            />
        </>
    );
}
