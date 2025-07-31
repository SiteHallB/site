interface KlaroAPI {
    getManager: any;
    show: () => void;
    // Ajoute d'autres méthodes si besoin
}

interface Window {
    klaro?: KlaroAPI;
    klaroConfig?: any;
    _klaroConsentListeners?: Array<(service: string, consent: boolean) => void>;
}
