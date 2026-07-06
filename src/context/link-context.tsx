"use client"

/**
 * Contexte des liens externes (réseaux sociaux, Doctolib, Google Maps…).
 * Alimenté par le CMS (Réglages → Coordonnées & horaires) depuis le layout serveur.
 */
import React, { createContext, useContext, ReactNode } from 'react';

type LinkMap = Record<string, string>;

const LinkContext = createContext<LinkMap>({});

export function useLinks() { return useContext(LinkContext); }

export function LinkProvider({ value, children }: { value: LinkMap; children: ReactNode; }) {
    return (
        <LinkContext.Provider value={value}>
            {children}
        </LinkContext.Provider>
    );
}
