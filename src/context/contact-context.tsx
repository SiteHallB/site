"use client"

/**
 * Contexte des informations de contact (téléphone, email, horaires…).
 * Alimenté par le CMS (Réglages → Coordonnées & horaires) depuis le layout serveur.
 */
import React, { createContext, useContext, ReactNode } from 'react';

type ContactMap = Record<string, string>;

const ContactContext = createContext<ContactMap>({});

export function useContact() { return useContext(ContactContext); }

export function ContactProvider({ value, children }: { value: ContactMap; children: ReactNode; }) {
    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}
