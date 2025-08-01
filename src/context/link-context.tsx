"use client"

import React, { createContext, useContext, ReactNode } from 'react';

type LinkMap = Record<string, string>;

const LinkContext = createContext<LinkMap>({});

export function useLinks() { return useContext(LinkContext); }

export function LinkProvider({ children }: { children: ReactNode; }) {
    return (
        <LinkContext.Provider
            value={{
                osteo: "", 
                adresse: "https://maps.app.goo.gl/8NkxFXwWUCSQMxDLA", 
                instagram: "https://www.instagram.com/hallb.fr/", 
                facebook: "https://www.facebook.com/p/HALL-B-61576081445951/", 
                avis: "https://maps.app.goo.gl/q6AxEJa8WjfwpBVw8", 
                pannata: "https://www.panattasport.com/fr/", 
                technogym: "https://www.technogym.com/fr-FR/", 
                pallini: "https://www.pallini-sport.fr/", 
            }}
        >
            {children}
        </LinkContext.Provider>
    );
}