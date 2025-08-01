"use client"

import React, { createContext, useContext, ReactNode } from 'react';

type ContactMap = Record<string, string>;

const ContactContext = createContext<ContactMap>({});

export function useContact() { return useContext(ContactContext); }

export function ContactProvider({ children }: { children: ReactNode; }) {
    return (
        <ContactContext.Provider
            value={{
                numero: "04 66 19 16 76", 
                email: "contact@hallb.fr"
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}