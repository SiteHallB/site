import { useEffect, useState } from "react";
import getConsent from "@/components/cookies/get-consent";

export default function useKlaroConsent(serviceName: string): boolean | undefined {
    const [consent, setConsent] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        function subscribe(cb: (service: string, consent: boolean) => void) {
            window._klaroConsentListeners = window._klaroConsentListeners || [];
            window._klaroConsentListeners.push(cb);
            return () => {
                if (window._klaroConsentListeners)
                window._klaroConsentListeners = window._klaroConsentListeners.filter(fn => fn !== cb);
            }
        }

        function checkConsent() {
            getConsent(serviceName) ? setConsent(true) : setConsent(undefined);
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
