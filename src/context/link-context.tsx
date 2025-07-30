"use client"

import React, { createContext, useContext, ReactNode } from 'react';

type LinkMap = Record<string, string>;

const LinkContext = createContext<LinkMap>({});

export function useLinks() { return useContext(LinkContext); }

export function LinkProvider({ links, children }: { links: LinkMap; children: ReactNode; }) {
    return (
        <LinkContext.Provider value={links}>
            {children}
        </LinkContext.Provider>
    );
}