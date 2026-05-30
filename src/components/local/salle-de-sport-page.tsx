import Link from "next/link";
import Image from "next/image";
import {
    Dumbbell,
    Users,
    Waves,
    Target,
    SquareParking,
    Clock,
    ChevronDown,
    ChevronRight,
    MapPin,
    Phone,
} from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import { COMMUNES, type Commune } from "@/components/local/communes-data";

const PHONE_DISPLAY = "04 66 19 16 76";
const PHONE_TEL = "+33466191676";
const MAP_SRC =
    "https://maps.google.com/maps?q=1%20chemin%20Azord%2C%2030980%20Saint-Dionisy&z=13&hl=fr&output=embed";

const FEATURES: { icon: React.ElementType; title: string; text: string }[] = [
    {
        icon: Dumbbell,
        title: "2 400 m² d'équipement",
        text: "Le plus grand plateau du Gard : machines Panatta, cardio Technogym, charges libres et espace cross-training.",
    },
    {
        icon: Users,
        title: "Cours collectifs & small groups",
        text: "RPM, Body Pump, Body Attack, Cardio Boxe, PPG, Yoga, CAF, Step, Zumba, Pilates… un planning complet encadré par des coachs diplômés.",
    },
    {
        icon: Waves,
        title: "Cours d'aqua & piscine chauffée",
        text: "Un bassin intérieur chauffé pour nos cours d'aqua (aquagym, aquabike…) et l'école de natation des enfants.",
    },
    {
        icon: Target,
        title: "Deux terrains de squash",
        text: "Réservation en ligne simple et rapide, pour jouer entre amis ou en compétition.",
    },
    {
        icon: SquareParking,
        title: "Parking gratuit",
        text: "Un grand parking gratuit juste devant l'entrée. Zéro stress de stationnement.",
    },
    {
        icon: Clock,
        title: "7j/7 de 6h à 23h",
        text: "Accès libre tous les jours, tôt le matin comme tard le soir. À votre rythme.",
    },
];

export default function SalleDeSportPage({ commune }: { commune: Commune }) {
    const others = COMMUNES.filter((c) => c.slug !== commune.slug);

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://www.hallb.fr/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: commune.h1,
                item: `https://www.hallb.fr/${commune.slug}`,
            },
        ],
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: commune.faq.map((f) => ({
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

            <PageStructure title={commune.h1} subtitle={commune.subtitle}>
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* Intro + image */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>{commune.intro}</div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                            <Image
                                src="/images/vue_plateau_1.webp"
                                alt={`Plateau de musculation de HALL B, salle de sport près de ${commune.ville}`}
                                width={3024}
                                height={4032}
                                className="object-cover object-center size-full"
                            />
                        </div>
                    </section>

                    {/* CTA principal */}
                    <section className="bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                        <p className="textLead text-foreground-base">
                            Envie d&apos;essayer&nbsp;? Votre première séance est offerte.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Clickable
                                clickableType={{ type: "link", path: "/essai-offert" }}
                                style={{ variant: "page", color: "accent" }}
                                className="flexCenter gap-2"
                            >
                                <MapPin className="size-5" />
                                Je profite de l&apos;essai offert
                            </Clickable>
                            <a
                                href={`tel:${PHONE_TEL}`}
                                className="clickableBase hoverPrimary text-foreground-base outline-[2px] outline-offset-[-2px] outline-foreground-base rounded-full px-4 py-2 textLead flexCenter gap-2"
                            >
                                <Phone className="size-5" />
                                {PHONE_DISPLAY}
                            </a>
                        </div>
                    </section>

                    {/* Comment venir + carte */}
                    <section>
                        <h2 className="text-foreground-base mb-content flex items-center gap-2">
                            <MapPin className="text-accent size-7 shrink-0" />
                            Comment venir depuis {commune.ville}
                        </h2>
                        <div className="mb-content">{commune.trajet}</div>
                        <div className="aspect-video rounded-xl overflow-hidden">
                            <iframe
                                title={`Itinéraire vers HALL B depuis ${commune.ville}`}
                                src={MAP_SRC}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                        <p className="textSmall mt-4">
                            HALL B — 1 chemin Azord, 30980 Saint-Dionisy.{" "}
                            <Link href="/comment-venir" className="text-accent hoverUnderline">
                                Voir tous les itinéraires et horaires
                            </Link>
                            .
                        </p>
                    </section>

                    {/* Différenciateurs */}
                    <section>
                        <h2 className="text-foreground-base mb-subTitle text-center">
                            Pourquoi choisir HALL B&nbsp;?
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                            {FEATURES.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <li
                                        key={f.title}
                                        className="bg-background-highlight rounded-xl p-6 flex flex-col gap-2"
                                    >
                                        <Icon className="text-accent size-8" />
                                        <p className="text-foreground-base font-semibold">{f.title}</p>
                                        <p className="textSmall">{f.text}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Liens activités */}
                    <section className="text-center">
                        <h2 className="text-foreground-base mb-subTitle">Découvrir HALL B</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { label: "Nos cours", path: "/cours" },
                                { label: "Musculation", path: "/cours/musculation" },
                                { label: "Cours d'aqua", path: "/cours/aqua" },
                                { label: "Squash", path: "/squash" },
                                { label: "Tarifs", path: "/tarifs" },
                                { label: "Plannings", path: "/plannings" },
                            ].map((l) => (
                                <Clickable
                                    key={l.path}
                                    clickableType={{ type: "link", path: l.path }}
                                    style={{ variant: "navigationBar", color: "primary" }}
                                    className="flexCenter gap-1"
                                >
                                    {l.label}
                                    <ChevronRight className="size-4" />
                                </Clickable>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-foreground-base mb-subTitle text-center">Questions fréquentes</h2>
                        <ul className="list-none space-y-3">
                            {commune.faq.map((f) => (
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

                    {/* Autres villes */}
                    <section className="text-center">
                        <h2 className="text-foreground-base mb-content">
                            HALL B, votre salle de sport dans tout le bassin nîmois
                        </h2>
                        <p className="mb-content">
                            Notre salle de Saint-Dionisy accueille aussi les sportifs de&nbsp;:
                        </p>
                        <nav
                            aria-label="Autres villes desservies par HALL B"
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {others.map((o) => (
                                <Link
                                    key={o.slug}
                                    href={`/${o.slug}`}
                                    className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                >
                                    {o.linkLabel}
                                </Link>
                            ))}
                        </nav>
                    </section>
                </div>
            </PageStructure>
        </>
    );
}
