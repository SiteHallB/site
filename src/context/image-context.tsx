"use client"

import React, { createContext, useContext, ReactNode } from 'react';

export type ImageType = { src: string, width?: number, height?: number, alt: string };
type ImageMap = Record<string, ImageType>;

const ImageContext = createContext<ImageMap>({});

export function useImage() { return useContext(ImageContext); }

export function ImageProvider({ children }: { children: ReactNode; }) {
    // const plannings_url = `https://backoffice-two-phi.vercel.app/assets/slots`;
    const plannings_url = `/images/plannings`;

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
        }, 


        plannings_desktop: {
            src: `${plannings_url}/bureau.svg`, 
            alt: "Planning activités HALL B"
        }, 
        plannings_lundi: {
            src: `${plannings_url}/lundi.svg`, 
            alt: "Planning lundi activités HALL B"
        }, 
        plannings_mardi: {
            src: `${plannings_url}/mardi.svg`, 
            alt: "Planning mardi activités HALL B"
        }, 
        plannings_mercredi: {
            src: `${plannings_url}/mercredi.svg`, 
            alt: "Planning mercredi activités HALL B"
        }, 
        plannings_jeudi: {
            src: `${plannings_url}/jeudi.svg`, 
            alt: "Planning jeudi activités HALL B"
        }, 
        plannings_vendredi: {
            src: `${plannings_url}/vendredi.svg`, 
            alt: "Planning vendredi activités HALL B"
        }, 
        plannings_samedi: {
            src: `${plannings_url}/samedi.svg`, 
            alt: "Planning samedi activités HALL B"
        }, 
        plannings_danse: {
            src: `${plannings_url}/danse.svg`, 
            alt: "Planning danse activités HALL B"
        }, 
        plannings_aqua_desktop: {
            src: `${plannings_url}/aqua_bureau.svg`, 
            alt: "Planning aqua HALL B"
        }, 
        plannings_aqua_lundi: {
            src: `${plannings_url}/aqua_lundi.svg`, 
            alt: "Planning lundi aqua HALL B"
        }, 
        plannings_aqua_mardi: {
            src: `${plannings_url}/aqua_mardi.svg`, 
            alt: "Planning mardi aqua HALL B"
        }, 
        plannings_aqua_mercredi: {
            src: `${plannings_url}/aqua_mercredi.svg`, 
            alt: "Planning mercredi activités HALL B"
        }, 
        plannings_aqua_jeudi: {
            src: `${plannings_url}/aqua_jeudi.svg`, 
            alt: "Planning jeudi aqua HALL B"
        }, 
        plannings_aqua_vendredi: {
            src: `${plannings_url}/aqua_vendredi.svg`, 
            alt: "Planning vendredi aqua HALL B"
        }, 

        squash: {
            src: `/images/squash.jpg`, 
            alt: "Terrain de squash HALL B",
            width: 3024, 
            height: 4032,
        },
    }

    return (
        <ImageContext.Provider
            value={{
                root_concept_espace: images.vue_plateau_1, 
                root_concept_encadrement: images.salle_rpm, 
                root_concept_qualite: images.poids_qualibres, 
                root_concept_adn: images.salle_cardio, 
                root_histoire: {
                    src: "/images/equipe.jpg", 
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
                tarifs_aqua_2: images.vue_plateau_2, 
                tarifs_aqua_3: images.salle_cardio, 
                tarifs_danse_1: images.salle_danse, 

                menu: images.crossfit, 

                logo: images.logo, 
                pannataLogo: images.pannataLogo, 
                technogymLogo: images.technogymLogo, 
                palliniLogo: images.palliniLogo, 

                plannings_desktop: images.plannings_desktop, 
                plannings_lundi: images.plannings_lundi, 
                plannings_mardi: images.plannings_mardi, 
                plannings_mercredi: images.plannings_mercredi, 
                plannings_jeudi: images.plannings_jeudi, 
                plannings_vendredi: images.plannings_vendredi,
                plannings_samedi: images.plannings_samedi,
                plannings_danse: images.plannings_danse, 
                plannings_aqua_desktop: images.plannings_aqua_desktop, 
                plannings_aqua_lundi: images.plannings_aqua_lundi,
                plannings_aqua_mardi: images.plannings_aqua_mardi, 
                plannings_aqua_mercredi: images.plannings_aqua_mercredi,
                plannings_aqua_jeudi: images.plannings_aqua_jeudi, 
                plannings_aqua_vendredi: images.plannings_aqua_vendredi, 

                squash: images.squash,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}