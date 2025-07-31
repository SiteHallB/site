"use client";

export default function getConsent(serviceName: string): boolean | undefined {
    if (typeof window !== "undefined" && window.klaro)
        return window.klaro?.getManager().consents[serviceName];
    return undefined;
}