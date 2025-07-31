'use client';

import { useEffect } from 'react';

function initTarteaucitron() {
    if (!(window as any).tarteaucitron) return;

    const tc = (window as any).tarteaucitron;

    tc.init({
        privacyUrl: '/politique-confidentialite',
        orientation: 'bottom',
        showAlertSmall: false,
        cookieslist: true,
        AcceptAllCta: true,
        highPrivacy: true,
        mandatory: true,
        useExternalCss: false,
        useExternalJs: false,
    });

    // Google Analytics
    tc.user.gtagUa = 'G-XXXXXXXXXX';
    tc.job = tc.job || [];
    tc.job.push('gtag');

    // HCaptcha
    tc.user.hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
    tc.job.push('hcaptcha');
}

export function CookieConsent() {
    useEffect(() => {
        if (!(window as any).tarteaucitron) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.22.0/tarteaucitron.js';
            script.async = true;
            script.onload = () => {
                initTarteaucitron();
            };
            document.head.appendChild(script);
        } else {
            initTarteaucitron();
        }
    }, []);

    return null;
}