"use client";
import { useEffect } from "react";
import Script from "next/script";
import useKlaroConsent from "../cookies/use-klaro-consent";
import Clickable from "../ui/clickable";

export default function SportigoPlannings() {
    const hasConsent = useKlaroConsent("sportigo");

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

    useEffect(() => {
        if (hasConsent) init();
    }, [hasConsent]);

    if (hasConsent) {
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
    } else {
        return (
            <div className="flex flex-col gap-y-content items-center p-content rounded-xl">
                <p className="text-baskground-base">Veuillez accepter les cookies fonctionnalités du site pour pouvoir consulter le planning en ligne.</p>
                <Clickable
                    clickableType={{ type: "button", onClick: () => window.klaro?.show()}}
                    style={{ color: "accent", variant: "secondary" }}
                    className="max-w-100 w-full"
                >
                    Gérer mes cookies
                </Clickable>
            </div>
        )
    }
}
