'use client';

import { useEffect } from "react";

const klaroUrl = "https://cdn.kiprotect.com/klaro/latest/klaro.js";
const klaroConfigUrl = "/klaro-config.js";

export default function KlaroConsent() {      
    function loadKlaroConfig() {
        if (!window.klaroConfig) {
            const configScript = document.createElement("script");
            configScript.src = klaroConfigUrl;
            configScript.async = true;
            document.body.appendChild(configScript);
        }
    }

    function loadKlaro() {
        if (!window.klaro) {
            loadKlaroConfig();
            console.log("load klaro");
            const script = document.createElement("script");
            script.src = klaroUrl;
            script.async = true;
            document.body.appendChild(script);
        }
    }

    useEffect(() => {
        
      
    }, []);
    return null;
}
