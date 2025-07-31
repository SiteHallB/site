interface KlaroAPI {
    getConsent: (service: string) => boolean;
    show: () => void;
    // Ajoute d'autres méthodes si besoin
}

interface Window {
    klaro?: KlaroAPI;
    klaroConfig?: any;
}
