import { Metadata } from "next";

import PageStructure from "@/components/ui/page-structure";

export const metadata: Metadata = {
    title: "Visite virtuelle 360° | HALL B – Salle de sport à Saint-Dionisy (Nîmes)",
    description:
        "Visitez HALL B en 360° avant de venir : plateau de musculation, salles de cours, espace aquatique. Promenez-vous dans la salle depuis chez vous.",
    alternates: { canonical: "https://www.hallb.fr/visite-virtuelle" },
    // Version de test partagée par lien pour recueillir des avis : pas d'indexation, pas d'entrée dans le menu.
    robots: { index: false, follow: false },
    openGraph: {
        title: "Visite virtuelle 360° | HALL B",
        description: "Promenez-vous dans HALL B en 360°, de salle en salle, depuis chez vous.",
        url: "https://www.hallb.fr/visite-virtuelle",
        type: "website",
        siteName: "HALL B",
    },
};

// La visite elle-même est un dossier statique autonome (public/visite/) : elle ne dépend
// ni de Next.js ni d'un service tiers, et peut être copiée telle quelle sur un autre hébergement.
export default function Page() {
    return (
        <PageStructure
            title="Visite virtuelle"
            subtitle={
                <p>
                    Faites le tour de HALL B en 360° : faites glisser pour regarder autour de vous, cliquez sur les
                    flèches au sol pour passer d&apos;un espace à l&apos;autre.
                </p>
            }
        >
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-3">
                <iframe
                    src="/visite/index.html?integre"
                    title="Visite virtuelle 360° de HALL B"
                    className="w-full h-[70svh] min-h-[420px] rounded-lg border border-foreground-subdued/30 bg-black"
                    allow="fullscreen; accelerometer; gyroscope"
                    loading="lazy"
                />
                <a
                    href="/visite/index.html"
                    className="self-end text-sm text-foreground-subdued underline hover:text-accent"
                >
                    Ouvrir la visite en plein écran
                </a>
            </div>
        </PageStructure>
    );
}
