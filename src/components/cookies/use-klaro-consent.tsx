import { useEffect, useState } from "react";

export default function useKlaroConsent(serviceName: string): boolean {
    const [consent, setConsent] = useState<boolean>(false);

    useEffect(() => {
        function checkConsent() {
        if (
            typeof window !== "undefined" &&
            window.klaro &&
            typeof window.klaro.getConsent === "function"
        ) {
            setConsent(window.klaro.getConsent(serviceName));
        } else {
            setConsent(false);
        }
        }
        checkConsent();
        window.addEventListener("klaro-consent-changed", checkConsent);
        return () => {
        window.removeEventListener("klaro-consent-changed", checkConsent);
        };
    }, [serviceName]);

    return consent;
}
