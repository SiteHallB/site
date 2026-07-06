import { Metadata } from "next";
import { draftMode } from "next/headers";
import { preload } from "react-dom";

import Hero from "@/components/root/hero";
import Concept from "@/components/root/concept";
import EssaiOffert from "@/components/root/essai-offert";
import Histoire from "@/components/root/histoire";
import Valeurs from "@/components/root/valeurs";
import SeoLocal from "@/components/root/seo-local";

import { getCollection, getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const LOGO_DEFAUT: ImageType = { src: "/images/logo.png", width: 1240, height: 1328, alt: "Logo HALL B" };
const IMAGE_DEFAUT: ImageType = { src: "/images/vue_plateau_1.webp", width: 3024, height: 4032, alt: "Salle de sport HALL B" };

export async function generateMetadata(): Promise<Metadata> {
    const accueil = await getGlobal("accueil");
    return {
        title: accueil?.seo?.titre || "HALL B – Salle de sport à Saint Dionisy | Nîmes, Gard",
        description:
            accueil?.seo?.description ||
            "Salle de sport 2 400 m² à Saint Dionisy, à 15 min de Nîmes (Gard) : musculation, cours collectifs, squash, aquagym, danse. Essayez HALL B gratuitement !",
        alternates: { canonical: `${SITE_URL}/` },
        robots: accueil?.seo?.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function Home() {
    const { isEnabled: draft } = await draftMode();
    const [accueil, theme, pagesLocales] = await Promise.all([
        getGlobal("accueil", draft),
        getGlobal("theme", draft),
        getCollection("villes", { draft }),
    ]);

    const logo = img(theme?.logo, LOGO_DEFAUT) as ImageType;
    const hero = accueil?.hero;

    const posterMobile = img(hero?.posterMobile)?.src || "/images/video-mobile-poster.webp";
    const posterDesktop = img(hero?.posterDesktop)?.src || "/images/video-desktop-poster.webp";

    /* Précharge l'image LCP du hero (poster vidéo) selon la taille d'écran. */
    preload(posterMobile, { as: "image", media: "(max-width: 767.98px)", fetchPriority: "high" });
    preload(posterDesktop, { as: "image", media: "(min-width: 768px)", fetchPriority: "high" });

    const concept = accueil?.concept;
    const essai = accueil?.essaiOffert;
    const histoire = accueil?.histoire;
    const valeurs = accueil?.valeurs;
    const seoLocal = accueil?.seoLocal;

    return (
        <main className="relative bg-background-base">
            <Hero
                data={{
                    titre: hero?.titre || "La plus grande salle de sport du Gard",
                    logo,
                    videoDesktop:
                        hero?.videoDesktop ||
                        "https://vz-80ca2e5b-6ca.b-cdn.net/5d676075-41e1-410d-9582-bac89110c43b/playlist.m3u8",
                    videoMobile:
                        hero?.videoMobile ||
                        "https://vz-80ca2e5b-6ca.b-cdn.net/543c7316-c279-43a4-a730-782a53783e41/playlist.m3u8",
                    posterDesktop,
                    posterMobile,
                    bandeau:
                        hero?.bandeau?.map((b) => ({
                            texte: b.texte,
                            url: b.url,
                            externe: b.externe ?? false,
                        })) ?? [],
                    boutons:
                        hero?.boutons?.map((b) => ({
                            texte: b.texte,
                            url: b.url,
                            style: (b.style ?? "accent") as "primary" | "accent",
                        })) ?? [],
                }}
            />
            {concept && (
                <Concept
                    data={{
                        titre: concept.titre || "Notre Concept",
                        intro: <RichText data={concept.intro} />,
                        sections:
                            concept.sections?.map((s) => ({
                                titre: s.titre,
                                texte: <RichText data={s.texte} />,
                                image: img(s.image, IMAGE_DEFAUT) as ImageType,
                            })) ?? [],
                        ctaTexte: <RichText data={concept.ctaTexte} />,
                        ctaBouton: {
                            texte: concept.ctaBouton?.texte || "Je m'inscris",
                            url: concept.ctaBouton?.url || "/tarifs",
                            style: (concept.ctaBouton?.style ?? "accent") as "primary" | "accent",
                        },
                    }}
                />
            )}
            {essai && (
                <EssaiOffert
                    data={{
                        ligne1: essai.ligne1 || "Viens essayer",
                        ligne2: essai.ligne2 || "gratuitement et sans engagement",
                        bouton: {
                            texte: essai.bouton?.texte || "Essai Offert",
                            url: essai.bouton?.url || "/essai-offert",
                        },
                        logo,
                    }}
                />
            )}
            {histoire && (
                <Histoire
                    data={{
                        titre: histoire.titre || "Notre Histoire",
                        intro: <RichText data={histoire.intro} />,
                        image: img(histoire.image, IMAGE_DEFAUT) as ImageType,
                        texte: <RichText data={histoire.texte} className="[&_p]:mb-content" />,
                    }}
                />
            )}
            {valeurs && (
                <Valeurs
                    data={{
                        titre: valeurs.titre || "Nos Valeurs",
                        image: img(valeurs.image, IMAGE_DEFAUT) as ImageType,
                        valeurs: valeurs.liste?.map((v) => v.nom) ?? [],
                    }}
                />
            )}
            {seoLocal && (
                <SeoLocal
                    data={{
                        titre: seoLocal.titre || "Votre salle de sport entre Nîmes et la Vaunage",
                        contenu: <RichText data={seoLocal.contenu} />,
                        distances: pagesLocales.map((p) => ({
                            ville: p.linkLabel || p.ville,
                            temps: p.temps || "",
                            slug: p.slug,
                        })),
                    }}
                />
            )}
        </main>
    );
}
