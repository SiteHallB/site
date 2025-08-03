"use client"

import React, { createContext, useContext, ReactNode } from 'react';

export type ImageType = { src: string, width: number, height: number, alt: string };
type ImageMap = Record<string, ImageType>;

const ImageContext = createContext<ImageMap>({});

export function useImage() { return useContext(ImageContext); }

export function ImageProvider({ children }: { children: ReactNode; }) {
    const images = {
        vue_plateau_1: {
            src: "/images/vue_plateau_1.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Vue de l'ensemble du plateau de musculation"
        }, 
        vue_plateau_2: {
            src: "/images/vue_plateau_2.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Plateau de musculation et jardinière centrale"
        }, 
        salle_rpm: {
            src: "/images/salle_rpm.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle de cours de vélo collectifs (rpm)"
        }, 
        poids_qualibres: {
            src: "/images/poids_qualibres.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Machines avec poids qualibrés pour la compétition"
        }, 
        salle_cardio: {
            src: "/images/salle_cardio.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle cardio avec de nombreux tapis de course et une atmosphère lumineuse"
        }, 
        sacs_boxe_1: {
            src: "/images/sacs_boxe_1.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle avec sacs de frappes et altères"
        }, 
        sacs_boxe_2: {
            src: "/images/sacs_boxe_1.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle avec sacs de frappes"
        }, 
        salle_danse: {
            src: "/images/salle_danse.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle de danse avec mirroir et logo HALL B"
        }, 
        salle_coursco: {
            src: "/images/salle_coursco.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Salle de cours collectifs avec mirroir et logos HALL B"
        }, 
        piscine: {
            src: "/images/piscine.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Bassin d'aquagym avec professeure et pratiquants"
        }, 
        crossfit: {
            src: "/images/crossfit.jpg", 
            width: 3024, 
            height: 4032, 
            alt: "Allée crossfits et machines de musculation"
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
    }

    return (
        <ImageContext.Provider
            value={{
                root_concept_espace: images.vue_plateau_1, 
                root_concept_encadrement: images.salle_rpm, 
                root_concept_qualite: images.poids_qualibres, 
                root_concept_adn: images.salle_cardio, 
                root_histoire: {
                    src: "/images/root_histoire.jpg", 
                    width: 3024, 
                    height: 4032, 
                    alt: ""
                }, 
                root_valeurs: images.sacs_boxe_1, 
                tarifs_classic_1: images.vue_plateau_2, 
                tarifs_classic_2: images.salle_cardio, 
                tarifs_boost_1: images.vue_plateau_2, 
                tarifs_boost_2: images.salle_cardio, 
                tarifs_boost_3: images.salle_coursco, 
                tarifs_boost_4: images.salle_rpm, 
                tarifs_boost_5: images.sacs_boxe_2, 
                tarifs_aqua_1: images.piscine, 
                tarifs_danse_1: images.salle_danse, 
                menu: images.crossfit, 
                logo: images.logo, 
                pannataLogo: images.pannataLogo, 
                technogymLogo: images.technogymLogo, 
                palliniLogo: images.palliniLogo
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}