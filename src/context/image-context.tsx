"use client"

import React, { createContext, useContext, ReactNode } from 'react';

export type ImageType = { src: string, width: number, height: number, alt: string };
type ImageMap = Record<string, ImageType>;

const ImageContext = createContext<ImageMap>({});

export function useImage() { return useContext(ImageContext); }

export function ImageProvider({ children }: { children: ReactNode; }) {
    return (
        <ImageContext.Provider
            value={{
                root_concept_espace: {
                    src: "/images/root_concept_espace.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_concept_encadrement: {
                    src: "/images/root_concept_encadrement.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_concept_qualite: {
                    src: "/images/root_concept_qualite.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_concept_adn: {
                    src: "/images/root_concept_adn.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_histoire: {
                    src: "/images/root_histoire.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_valeurs: {
                    src: "/images/root_valeurs.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_classic_1: {
                    src: "/images/tarifs_classic_1.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_classic_2: {
                    src: "/images/root_concept_adn.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_boost_1: {
                    src: "/images/tarifs_classic_1.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_boost_2: {
                    src: "/images/root_concept_adn.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_boost_3: {
                    src: "/images/tarifs_boost_3.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_boost_4: {
                    src: "/images/tarifs_boost_4.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_boost_5: {
                    src: "/images/tarifs_boost_5.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_aqua_1: {
                    src: "/images/tarifs_aqua_1.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                tarifs_danse_1: {
                    src: "/images/tarifs_danse_1.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                menu:  {
                    src: "/images/menu.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                logo: {
                    src: "/images/logo.png", 
                    width: 1240, 
                    height: 1328, 
                    alt: "Logo HALL B"
                }, 
                pannataLogo: {
                    src: "/images/pannata.png", 
                    width: 272, 
                    height: 109, 
                    alt: "Logo Pannata"
                }, 
                technogymLogo: {
                    src: "/images/technogym.png", 
                    width: 820, 
                    height: 231, 
                    alt: "Logo Technogym"
                }, 
                palliniLogo: {
                    src: "/images/pallini.png", 
                    width: 1633, 
                    height: 396, 
                    alt: "Logo Pallini"
                }
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}