"use client"

/**
 * Contexte des images partagées (logo, etc.).
 * Alimenté par le CMS depuis le layout serveur — voir src/app/(site)/layout.tsx.
 */
import React, { createContext, useContext, ReactNode } from 'react';

export type ImageType = { src: string, width?: number, height?: number, alt: string };
type ImageMap = Record<string, ImageType>;

const ImageContext = createContext<ImageMap>({});

export function useImage() { return useContext(ImageContext); }

export function ImageProvider({ value, children }: { value: ImageMap; children: ReactNode; }) {
    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    );
}
