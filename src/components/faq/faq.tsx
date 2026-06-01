import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";

type QA = { question: string; answer: string };

const FAQ: QA[] = [
    {
        question: "Quels sont les horaires de la salle de sport HALL B ?",
        answer:
            "Le plateau de musculation et de cardio-training est accessible 7j/7, de 6h à 23h. Les cours collectifs, l'aquagym, la danse et le squash suivent un planning hebdomadaire consultable sur la page Plannings.",
    },
    {
        question: "Où se situe HALL B et comment y accéder ?",
        answer:
            "HALL B se trouve au 1 chemin Azord, 30980 Saint-Dionisy, au cœur de la Vaunage, à 15 minutes de Nîmes. Un grand parking gratuit est disponible juste devant l'entrée, avec des itinéraires simples depuis Nîmes, Calvisson, Sommières et Quissac.",
    },
    {
        question: "Combien coûte un abonnement chez HALL B ?",
        answer:
            "HALL B propose plusieurs formules d'abonnement sans engagement (musculation, cours collectifs, aquagym, danse) ainsi que des carnets de séances pour plus de flexibilité. Le détail des tarifs est disponible sur la page Tarifs.",
    },
    {
        question: "Peut-on essayer la salle gratuitement avant de s'inscrire ?",
        answer:
            "Oui. HALL B offre une séance d'essai gratuite pour découvrir les équipements, les cours et l'ambiance avant de vous engager. La réservation se fait en ligne en quelques clics.",
    },
    {
        question: "Quelles activités et quels équipements propose HALL B ?",
        answer:
            "Sur 2 400 m², HALL B réunit un grand plateau de musculation (machines Panatta, cardio Technogym), des cours collectifs (RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates), des small groups, deux terrains de squash, un bassin chauffé pour l'aquagym et la natation enfant, une école de danse et un pôle santé avec ostéopathe.",
    },
    {
        question: "Faut-il déjà être sportif pour s'entraîner chez HALL B ?",
        answer:
            "Non, tous les profils sont les bienvenus, du grand débutant au sportif confirmé. Nos coachs diplômés vous accueillent, corrigent vos mouvements et adaptent votre programme à vos objectifs : remise en forme, prise de masse, perte de poids ou simple plaisir de bouger.",
    },
    {
        question: "Y a-t-il un parking à HALL B ?",
        answer:
            "Oui, un grand parking gratuit se trouve directement devant l'entrée de la salle. Aucun souci de stationnement, même aux heures de forte affluence.",
    },
    {
        question: "Peut-on offrir une carte cadeau HALL B ?",
        answer:
            "Oui, HALL B propose des cartes cadeaux valables sur ses activités. C'est une idée idéale pour faire découvrir la salle à un proche.",
    },
];

const LINKS: { label: string; path: string }[] = [
    { label: "Voir les tarifs", path: "/tarifs" },
    { label: "Plannings des cours", path: "/plannings" },
    { label: "Nos cours", path: "/cours" },
    { label: "Comment venir", path: "/comment-venir" },
    { label: "Carte cadeau", path: "/carte-cadeau" },
];

export default function Faq() {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hallb.fr/" },
            { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.hallb.fr/faq" },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />

            <PageStructure
                title="Questions fréquentes"
                subtitle={
                    <p>
                        Horaires, tarifs, accès, activités… Retrouvez toutes les réponses sur HALL B, votre
                        salle de sport à Saint-Dionisy, à 15 minutes de Nîmes.
                    </p>
                }
            >
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* FAQ accordéon */}
                    <section>
                        <ul className="list-none space-y-3">
                            {FAQ.map((f) => (
                                <li key={f.question} className="bg-background-highlight rounded-xl">
                                    <details className="group">
                                        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-4 flex items-center justify-between gap-4 text-foreground-base font-semibold">
                                            {f.question}
                                            <ChevronDown className="text-accent size-5 shrink-0 transition-transform group-open:rotate-180" />
                                        </summary>
                                        <p className="px-4 pb-4 textSmall">{f.answer}</p>
                                    </details>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Liens utiles */}
                    <section className="text-center">
                        <h2 className="text-foreground-base mb-subTitle">Pour aller plus loin</h2>
                        <nav aria-label="Liens utiles" className="flex flex-wrap justify-center gap-3">
                            {LINKS.map((l) => (
                                <Link
                                    key={l.path}
                                    href={l.path}
                                    className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </section>

                    {/* CTA */}
                    <section className="bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                        <p className="textLead text-foreground-base">
                            Une autre question&nbsp;? La meilleure réponse, c&apos;est d&apos;essayer.
                        </p>
                        <Clickable
                            clickableType={{ type: "link", path: "/essai-offert" }}
                            style={{ variant: "page", color: "accent" }}
                            className="flexCenter gap-2 max-w-xs"
                        >
                            Je profite de l&apos;essai offert
                        </Clickable>
                    </section>
                </div>
            </PageStructure>
        </>
    );
}
