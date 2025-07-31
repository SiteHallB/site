import { useEffect, useState } from "react";

export default function useKlaroConsent(serviceName: string): boolean | undefined {
    const [consent, setConsent] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // Fonction pour s'abonner
        function subscribe(cb: (service: string, consent: boolean) => void) {
            window._klaroConsentListeners = window._klaroConsentListeners || [];
            window._klaroConsentListeners.push(cb);
            return () => {
                if (window._klaroConsentListeners)
                window._klaroConsentListeners = window._klaroConsentListeners.filter(fn => fn !== cb);
            }
        }

        function checkConsent() {
            if (
                typeof window !== "undefined" &&
                window.klaro &&
                typeof window.klaro.getConsent === "function"
            ) {
                setConsent(window.klaro.getConsent(serviceName));
            } else {
                setConsent(undefined);
            }
        }

        checkConsent();

        const cb = (service: string, consentValue: boolean) => {
            if (service === serviceName) setConsent(consentValue);
        };
        const unsubscribe = subscribe(cb);

        return () => {
            unsubscribe && unsubscribe();
        };
    }, [serviceName]);

    return consent;
}
