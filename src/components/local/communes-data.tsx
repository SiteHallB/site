import { ReactNode } from "react";
import Link from "next/link";

export type Commune = {
    /** Route segment & sitemap slug, e.g. "salle-de-sport-nimes" */
    slug: string;
    /** Display name of the city/area, e.g. "Nîmes" */
    ville: string;
    /** Short label used in cross-links between geo pages */
    linkLabel: string;
    metaTitle: string;
    metaDescription: string;
    /** H1 rendered by PageStructure */
    h1: string;
    /** Subtitle under the H1 */
    subtitle: ReactNode;
    /** Travel time headline, e.g. "15 minutes" or "au cœur de la Vaunage" */
    distance: string;
    /** 2 unique intro paragraphs (city-specific) */
    intro: ReactNode;
    /** "Comment venir" paragraph(s), city-specific */
    trajet: ReactNode;
    /** 2-3 city-flavoured Q/A — reused for display AND FAQPage schema */
    faq: { question: string; answer: string }[];
};

const accent = "text-accent hoverUnderline";

export const COMMUNES: Commune[] = [
    {
        slug: "salle-de-sport-nimes",
        ville: "Nîmes",
        linkLabel: "Nîmes",
        metaTitle: "Salle de sport à Nîmes (Gard) | HALL B – 2 400 m² à 15 min",
        metaDescription:
            "La plus grande salle de sport près de Nîmes : 2 400 m², musculation Panatta & Technogym, cours collectifs, squash, aquagym. À 15 min de Nîmes, parking gratuit. Essai offert.",
        h1: "Salle de sport à Nîmes",
        subtitle: (
            <p>
                À 15 minutes de Nîmes, HALL B est la plus grande salle de sport du Gard&nbsp;: 2 400 m²
                d&apos;équipement haut de gamme, parking gratuit et accès 7j/7.
            </p>
        ),
        distance: "15 minutes",
        intro: (
            <>
                <p className="mb-content">
                    À seulement <strong>15 minutes du centre de Nîmes</strong>, HALL B accueille
                    chaque jour les Nîmois dans une <strong>salle de sport de 2 400 m²</strong> à Saint-Dionisy, au
                    cœur de la Vaunage. Loin de l&apos;agitation et des stationnements payants du centre-ville, vous
                    profitez d&apos;un équipement premium, d&apos;un grand parking gratuit et d&apos;un
                    accès libre 7j/7 de 6h à 23h.
                </p>
                <p>
                    Sous un même toit&nbsp;: un grand{" "}
                    <Link href="/cours/musculation" className={accent}>plateau de musculation</Link> Panatta &amp;
                    Technogym, des <Link href="/cours" className={accent}>cours collectifs</Link> et small groups, un
                    bassin d&apos;<Link href="/cours/aquagym" className={accent}>aquagym</Link> chauffé, deux terrains
                    de <Link href="/squash" className={accent}>squash</Link>, une école de danse et un pôle santé.
                    Pour beaucoup de Nîmois de l&apos;ouest et du sud de la ville, HALL B est plus rapide d&apos;accès
                    — et bien plus complet — que les salles du centre.
                </p>
            </>
        ),
        trajet: (
            <p>
                Depuis Nîmes, rejoignez HALL B en une quinzaine de minutes en direction de la
                Vaunage (Caveirac, Saint-Dionisy) par la D40. Un grand{" "}
                <strong>parking gratuit</strong> vous attend directement devant l&apos;entrée&nbsp;: fini la chasse à
                la place de stationnement et les horodateurs. L&apos;itinéraire précis est indiqué sur la carte
                ci-dessous.
            </p>
        ),
        faq: [
            {
                question: "Quelle est la meilleure salle de sport près de Nîmes ?",
                answer: "HALL B, à Saint-Dionisy (15 min de Nîmes), est la plus grande salle de sport du Gard avec 2 400 m² : plateau de musculation Panatta & Technogym, cours collectifs, squash, aquagym, danse et pôle santé. Parking gratuit et accès 7j/7 de 6h à 23h.",
            },
            {
                question: "Combien de temps faut-il pour aller de Nîmes à HALL B ?",
                answer: "Comptez environ 15 minutes depuis le centre de Nîmes en direction de la Vaunage, et souvent moins depuis l'ouest de l'agglomération nîmoise. Un grand parking gratuit est disponible devant la salle.",
            },
        ],
    },
    {
        slug: "salle-de-sport-vaunage",
        ville: "la Vaunage",
        linkLabel: "Vaunage",
        metaTitle: "Salle de sport en Vaunage | HALL B – Saint-Dionisy (Gard)",
        metaDescription:
            "HALL B, la salle de sport de la Vaunage à Saint-Dionisy : 2 400 m², musculation, cours collectifs, squash, aquagym, danse. Au centre de Calvisson, Caveirac, Langlade, Nages. Essai offert.",
        h1: "Salle de sport en Vaunage",
        subtitle: (
            <p>
                Implantée à Saint-Dionisy, HALL B est LA salle de sport de la Vaunage&nbsp;: 2 400 m² au centre de la
                plaine, à quelques minutes de chaque village.
            </p>
        ),
        distance: "au cœur de la Vaunage",
        intro: (
            <>
                <p className="mb-content">
                    HALL B est <strong>la salle de sport de la Vaunage</strong>. Implantée à
                    Saint-Dionisy, au centre de la plaine viticole qui réunit Calvisson, Caveirac,
                    Langlade, Nages-et-Solorgues, Congénies, Boissières, Saint-Côme et Clarensac, elle place une salle
                    de 2 400 m² à quelques minutes seulement de chaque village.
                </p>
                <p>
                    Plus besoin de rouler jusqu&apos;à Nîmes ou Sommières pour s&apos;entraîner sérieusement&nbsp;:
                    vous trouvez ici un grand{" "}
                    <Link href="/cours/musculation" className={accent}>plateau de musculation</Link>, des{" "}
                    <Link href="/cours" className={accent}>cours collectifs</Link>, un bassin d&apos;
                    <Link href="/cours/aquagym" className={accent}>aquagym</Link> chauffé, deux terrains de{" "}
                    <Link href="/squash" className={accent}>squash</Link>, une école de danse et un pôle santé.
                    Le tout avec un parking gratuit et un accès 7j/7 de 6h à 23h.
                </p>
            </>
        ),
        trajet: (
            <p>
                Où que vous habitiez en Vaunage — Calvisson, Caveirac, Langlade, Nages, Congénies, Saint-Côme,
                Boissières ou Clarensac — HALL B est à <strong>moins de 10 minutes</strong> de chez vous. La salle est
                située à l&apos;entrée de Saint-Dionisy, avec un grand parking gratuit juste devant.
            </p>
        ),
        faq: [
            {
                question: "Où se trouve la salle de sport de la Vaunage ?",
                answer: "HALL B est située à Saint-Dionisy (30980), au centre de la Vaunage, à quelques minutes de Calvisson, Caveirac, Langlade, Nages, Congénies et Saint-Côme. Un grand parking gratuit est disponible devant la salle.",
            },
            {
                question: "Quelles activités propose HALL B en Vaunage ?",
                answer: "Musculation et cardio (Panatta, Technogym), cours collectifs et small groups, squash (2 terrains), aquagym en bassin chauffé, école de danse et pôle santé — sur 2 400 m², accessibles 7j/7 de 6h à 23h.",
            },
        ],
    },
    {
        slug: "salle-de-sport-calvisson",
        ville: "Calvisson",
        linkLabel: "Calvisson",
        metaTitle: "Salle de sport à Calvisson | HALL B – à 5 min (Vaunage, Gard)",
        metaDescription:
            "Votre salle de sport à 5 minutes de Calvisson : HALL B, 2 400 m² à Saint-Dionisy. Musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
        h1: "Salle de sport à Calvisson",
        subtitle: (
            <p>
                À 5 minutes de Calvisson, HALL B est votre salle de sport de proximité&nbsp;: 2 400 m², parking
                gratuit et accès 7j/7.
            </p>
        ),
        distance: "5 minutes",
        intro: (
            <>
                <p className="mb-content">
                    Capitale de la Vaunage, Calvisson est à peine à <strong>5 minutes</strong> de
                    HALL B. Notre <strong>salle de sport de 2 400 m²</strong>, à Saint-Dionisy, est sans doute la plus
                    proche et la plus complète pour les Calvissonnais qui veulent s&apos;entraîner sans faire de route.
                </p>
                <p>
                    Vous y trouvez un grand{" "}
                    <Link href="/cours/musculation" className={accent}>plateau de musculation</Link> Panatta &amp;
                    Technogym, un planning fourni de{" "}
                    <Link href="/cours" className={accent}>cours collectifs</Link> et de small groups, un bassin
                    d&apos;<Link href="/cours/aquagym" className={accent}>aquagym</Link> chauffé, deux terrains de{" "}
                    <Link href="/squash" className={accent}>squash</Link> et une école de danse — avec un{" "}
                    parking gratuit et un accès 7j/7 de 6h à 23h.
                </p>
            </>
        ),
        trajet: (
            <p>
                Depuis Calvisson, HALL B est à environ 5 minutes en voiture en direction de
                Saint-Dionisy. La salle se trouve à l&apos;entrée du village, avec un <strong>grand parking
                gratuit</strong> directement devant l&apos;entrée. Idéal pour venir s&apos;entraîner avant ou après le
                travail.
            </p>
        ),
        faq: [
            {
                question: "Y a-t-il une salle de sport à Calvisson ?",
                answer: "La salle de sport la plus proche et la plus complète de Calvisson est HALL B, à Saint-Dionisy (environ 5 minutes) : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h.",
            },
            {
                question: "HALL B est-elle loin de Calvisson ?",
                answer: "Non, comptez environ 5 minutes en voiture entre Calvisson et HALL B à Saint-Dionisy. Un grand parking gratuit vous attend devant la salle.",
            },
        ],
    },
    {
        slug: "salle-de-sport-sommieres",
        ville: "Sommières",
        linkLabel: "Sommières",
        metaTitle: "Salle de sport près de Sommières | HALL B – 2 400 m² (Gard)",
        metaDescription:
            "À 15 minutes de Sommières, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
        h1: "Salle de sport près de Sommières",
        subtitle: (
            <p>
                À 15 minutes de Sommières, HALL B réunit musculation, cours collectifs, squash et aquagym sur
                2 400 m² — avec parking gratuit.
            </p>
        ),
        distance: "15 minutes",
        intro: (
            <>
                <p className="mb-content">
                    À <strong>15 minutes de Sommières</strong> et de sa cité médiévale, HALL B est la
                    salle de sport la plus complète du secteur&nbsp;: <strong>2 400 m²</strong> d&apos;équipement à
                    Saint-Dionisy, au cœur de la Vaunage. Un vrai centre sportif plutôt qu&apos;une simple salle de
                    quartier.
                </p>
                <p>
                    Au programme&nbsp;: un grand{" "}
                    <Link href="/cours/musculation" className={accent}>plateau de musculation</Link> Panatta &amp;
                    Technogym, des <Link href="/cours" className={accent}>cours collectifs</Link> et small groups, un
                    bassin d&apos;<Link href="/cours/aquagym" className={accent}>aquagym</Link> chauffé, deux terrains
                    de <Link href="/squash" className={accent}>squash</Link>, une école de danse et un pôle santé.
                    Avec un parking gratuit et un accès 7j/7 de 6h à 23h.
                </p>
            </>
        ),
        trajet: (
            <p>
                Depuis Sommières, rejoignez HALL B en une quinzaine de minutes en direction de Calvisson et
                Saint-Dionisy. La salle est facile d&apos;accès, avec un <strong>grand parking gratuit</strong> juste
                devant l&apos;entrée. L&apos;itinéraire est indiqué sur la carte ci-dessous.
            </p>
        ),
        faq: [
            {
                question: "Quelle salle de sport choisir près de Sommières ?",
                answer: "HALL B, à Saint-Dionisy (15 min de Sommières), est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h.",
            },
            {
                question: "À quelle distance est HALL B de Sommières ?",
                answer: "Environ 15 minutes en voiture, en direction de Calvisson puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle.",
            },
        ],
    },
    {
        slug: "salle-de-sport-quissac",
        ville: "Quissac",
        linkLabel: "Quissac",
        metaTitle: "Salle de sport près de Quissac | HALL B – 2 400 m² (Gard)",
        metaDescription:
            "À 20 minutes de Quissac, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, aquagym. Parking gratuit, accès 7j/7. Essai offert.",
        h1: "Salle de sport près de Quissac",
        subtitle: (
            <p>
                À une vingtaine de minutes de Quissac, HALL B propose 2 400 m² de musculation, cours collectifs,
                squash et aquagym — avec parking gratuit.
            </p>
        ),
        distance: "20 minutes",
        intro: (
            <>
                <p className="mb-content">
                    À une <strong>vingtaine de minutes de Quissac</strong> et de la vallée du Vidourle,{" "}
                    HALL B offre aux habitants de la porte des Cévennes une véritable salle de sport
                    de <strong>2 400 m²</strong>, à Saint-Dionisy. Un équipement et un choix d&apos;activités qu&apos;on
                    ne trouve nulle part ailleurs dans le secteur.
                </p>
                <p>
                    Plateau de{" "}
                    <Link href="/cours/musculation" className={accent}>musculation</Link> Panatta &amp; Technogym,{" "}
                    <Link href="/cours" className={accent}>cours collectifs</Link> et small groups, bassin d&apos;
                    <Link href="/cours/aquagym" className={accent}>aquagym</Link> chauffé, deux terrains de{" "}
                    <Link href="/squash" className={accent}>squash</Link>, école de danse et pôle santé — avec un{" "}
                    parking gratuit et un accès 7j/7 de 6h à 23h.
                </p>
            </>
        ),
        trajet: (
            <p>
                Depuis Quissac, comptez environ 20 minutes en direction de Sommières puis
                Saint-Dionisy. La salle dispose d&apos;un <strong>grand parking gratuit</strong> juste devant
                l&apos;entrée. Retrouvez l&apos;itinéraire détaillé sur la carte ci-dessous.
            </p>
        ),
        faq: [
            {
                question: "Y a-t-il une grande salle de sport près de Quissac ?",
                answer: "Oui, HALL B à Saint-Dionisy (environ 20 minutes de Quissac) est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, aquagym et danse, avec parking gratuit et accès 7j/7 de 6h à 23h.",
            },
            {
                question: "Combien de temps de route entre Quissac et HALL B ?",
                answer: "Environ 20 minutes en voiture, via Sommières puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle.",
            },
        ],
    },
    {
        slug: "salle-de-sport-vergeze",
        ville: "Vergèze",
        linkLabel: "Vergèze",
        metaTitle: "Salle de sport près de Vergèze | HALL B – 2 400 m² (Gard)",
        metaDescription:
            "À 15 minutes de Vergèze, HALL B est la plus grande salle de sport du Gard : 2 400 m², musculation, cours collectifs, squash, cours d'aqua. Parking gratuit, accès 7j/7. Essai offert.",
        h1: "Salle de sport près de Vergèze",
        subtitle: (
            <p>
                À 15 minutes de Vergèze, HALL B réunit musculation, cours collectifs, squash et cours d&apos;aqua sur
                2 400 m² — avec parking gratuit et accès 7j/7.
            </p>
        ),
        distance: "15 minutes",
        intro: (
            <>
                <p className="mb-content">
                    À <strong>15 minutes de Vergèze</strong> et de la source Perrier, HALL B offre aux
                    habitants du sud de la Vaunage une véritable <strong>salle de sport de 2 400 m²</strong>, à
                    Saint-Dionisy. Un centre sportif complet, bien plus qu&apos;une simple salle de quartier.
                </p>
                <p>
                    Vous y trouvez un grand{" "}
                    <Link href="/cours/musculation" className={accent}>plateau de musculation</Link> Panatta &amp;
                    Technogym, des <Link href="/cours" className={accent}>cours collectifs</Link> et small groups, un
                    bassin de <Link href="/cours/aqua" className={accent}>cours d&apos;aqua</Link> chauffé, deux terrains
                    de <Link href="/squash" className={accent}>squash</Link>, une école de danse et un pôle santé.
                    Avec un parking gratuit et un accès 7j/7 de 6h à 23h.
                </p>
            </>
        ),
        trajet: (
            <p>
                Depuis Vergèze, rejoignez HALL B en une quinzaine de minutes en direction de la Vaunage
                (Boissières, Calvisson) puis Saint-Dionisy. La salle dispose d&apos;un{" "}
                <strong>grand parking gratuit</strong> juste devant l&apos;entrée. L&apos;itinéraire est indiqué sur la
                carte ci-dessous.
            </p>
        ),
        faq: [
            {
                question: "Y a-t-il une grande salle de sport près de Vergèze ?",
                answer: "Oui, HALL B à Saint-Dionisy (environ 15 minutes de Vergèze) est la plus grande salle de sport du Gard : 2 400 m² de musculation, cours collectifs, squash, cours d'aqua et danse, avec parking gratuit et accès 7j/7 de 6h à 23h.",
            },
            {
                question: "Combien de temps de route entre Vergèze et HALL B ?",
                answer: "Environ 15 minutes en voiture, en direction de Calvisson puis Saint-Dionisy. Un grand parking gratuit est disponible devant la salle.",
            },
        ],
    },
];

export function getCommune(slug: string): Commune | undefined {
    return COMMUNES.find((c) => c.slug === slug);
}
