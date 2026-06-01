"use client"

import SportigoSquash from "@/components/ui/sportigo-squash";

import PageStructure from "@/components/ui/page-structure";
import { useImage } from "@/context/image-context";
import { Flame, Zap, Brain, Users, ChevronDown } from "lucide-react";
import Image from "next/image";

const BENEFITS = [
    {
        Icon: Flame,
        title: "Brûle-calories",
        text: "600 à 900 kcal par heure. L'un des sports les plus efficaces pour se dépenser en un minimum de temps.",
    },
    {
        Icon: Zap,
        title: "Réflexes & vitesse",
        text: "Des échanges rapides qui développent les réflexes, la vitesse d'exécution et la coordination œil-main.",
    },
    {
        Icon: Brain,
        title: "Jeu tactique",
        text: "Anticiper, placer la balle, piéger l'adversaire : le squash est autant un sport mental que physique.",
    },
    {
        Icon: Users,
        title: "Entre amis",
        text: "Un format idéal pour partager un bon moment à deux, ou se challenger lors de nos tournois réguliers.",
    },
];

const FAQ = [
    {
        q: "Comment réserver un terrain de squash chez HALL B ?",
        a: "La réservation se fait directement en ligne sur cette page, en quelques clics. Choisissez votre créneau, en heure pleine ou en heure creuse, puis confirmez. Vous pouvez aussi réserver sur place à l'accueil.",
    },
    {
        q: "Faut-il apporter sa propre raquette ?",
        a: "Non, la location de raquettes est possible directement sur place. Vous pouvez venir les mains vides : il vous suffit d'une tenue de sport et de chaussures à semelle non marquante.",
    },
    {
        q: "Combien y a-t-il de terrains de squash ?",
        a: "HALL B dispose de deux terrains de squash, à Saint-Dionisy, à 15 minutes de Nîmes. Des tournois sont organisés régulièrement pour se challenger entre joueurs.",
    },
    {
        q: "Faut-il être adhérent pour jouer au squash ?",
        a: "Non. La location de terrain de squash est accessible à tous, adhérents comme non-adhérents, via la réservation en ligne. Le squash n'est pas inclus dans les formules d'abonnement.",
    },
    {
        q: "Le squash est-il un bon sport pour se dépenser ?",
        a: "Oui, le squash est l'un des sports les plus intenses : une partie peut brûler 600 à 900 kcal par heure. Il développe le cardio, la vitesse, les réflexes et la coordination, tout en restant ludique.",
    },
];

export default function Squash() {
    const { squash } = useImage();

    return (
        <PageStructure
            title="Réservation Squash"
            subtitle={<p>Envie de vous défouler ou de partager un bon moment entre amis ? Nos deux terrains de squash vous attendent chez HALL B à Saint-Dionisy, à 15 minutes de Nîmes.</p>}
        >
            {/* Réservation : offre + image + widget */}
            <div className="bg-background-highlight rounded-xl w-full p-1 flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center py-3 px-4 w-full space-y-4">
                    <ul className="text-foreground-subdued space-y-1">
                        <li><p>• Location de terrain facilement en ligne</p></li>
                        <li><p>• Location de raquettes sur place</p></li>
                        <li><p>• Tournois réguliers pour se challenger</p></li>
                    </ul>
                    <div className="max-w-100 aspect-square rounded-xl overflow-hidden mb-content mx-auto">
                        <Image
                            {...squash}
                            className="object-cover object-center size-full"
                        />
                    </div>
                </div>
                <SportigoSquash/>
            </div>

            {/* Le squash près de Nîmes */}
            <section className="w-full max-w-3xl text-foreground-subdued">
                <h2 className="text-foreground-base mb-content">Le squash à Saint-Dionisy, près de Nîmes</h2>
                <p className="mb-content">
                    Vous cherchez un <strong>terrain de squash près de Nîmes</strong> ? HALL B met à votre disposition
                    <strong> deux terrains de squash</strong> à <strong>Saint-Dionisy</strong>, en plein cœur de la
                    <span className="text-accent"> Vaunage</span>, à seulement 15 minutes de Nîmes et à proximité de
                    Calvisson, Sommières, Vergèze et Caveirac. Que vous soyez débutant curieux ou joueur confirmé, nos
                    courts sont ouverts à tous, adhérents comme visiteurs.
                </p>
                <p>
                    Le squash est l&apos;un des sports de raquette les plus complets et les plus intenses. Sur un court
                    fermé, la balle ne sort jamais du jeu : les échanges s&apos;enchaînent à un rythme soutenu et
                    sollicitent le cardio, la vitesse, les réflexes et le sens tactique. En une heure de jeu, on peut
                    brûler entre <strong>600 et 900 calories</strong> — difficile de trouver plus efficace pour se défouler.
                </p>
            </section>

            {/* Pourquoi jouer au squash */}
            <section className="w-full max-w-3xl">
                <h2 className="text-foreground-base mb-content">Pourquoi jouer au squash ?</h2>
                <div className="grid sm:grid-cols-2 gap-content">
                    {BENEFITS.map(({ Icon, title, text }) => (
                        <div key={title} className="bg-background-subdued rounded-xl p-content flex flex-col space-y-2">
                            <Icon className="size-7 text-accent" aria-hidden="true" />
                            <h3 className="text-foreground-base font-semibold">{title}</h3>
                            <p className="text-foreground-subdued textSmall">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Infos pratiques */}
            <section className="w-full max-w-3xl text-foreground-subdued">
                <h2 className="text-foreground-base mb-content">Infos pratiques</h2>
                <ul className="space-y-1">
                    <li><p>• Deux terrains réservables en ligne, 7j/7</p></li>
                    <li><p>• Location de raquettes et de balles sur place</p></li>
                    <li><p>• Vestiaires et douches à disposition</p></li>
                    <li><p>• Tournois réguliers ouverts à tous les niveaux</p></li>
                    <li><p>• Grand parking gratuit devant la salle</p></li>
                </ul>
                <p className="mt-content">
                    <strong>HALL B</strong> — 1 chemin Azord, 30980 Saint-Dionisy. À 15 min de Nîmes, accès facile depuis
                    toute la Vaunage et le bassin nîmois.
                </p>
            </section>

            {/* FAQ */}
            <section className="w-full max-w-3xl">
                <h2 className="text-foreground-base mb-content">Questions fréquentes</h2>
                <div className="flex flex-col">
                    {FAQ.map(({ q, a }) => (
                        <details
                            key={q}
                            className="group border-b border-foreground-subdued/20 py-3"
                        >
                            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden text-foreground-base font-semibold flex justify-between items-center gap-4">
                                <span>{q}</span>
                                <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                            </summary>
                            <p className="mt-2 text-foreground-subdued">{a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </PageStructure>
    );
}
