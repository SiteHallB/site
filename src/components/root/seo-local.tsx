import Link from "next/link";

const DISTANCES: { ville: string; temps: string; slug: string }[] = [
    { ville: "Nîmes", temps: "15 min", slug: "salle-de-sport-nimes" },
    { ville: "Vaunage", temps: "Sur place", slug: "salle-de-sport-vaunage" },
    { ville: "Calvisson", temps: "5 min", slug: "salle-de-sport-calvisson" },
    { ville: "Sommières", temps: "15 min", slug: "salle-de-sport-sommieres" },
    { ville: "Quissac", temps: "20 min", slug: "salle-de-sport-quissac" },
    { ville: "Vergèze", temps: "15 min", slug: "salle-de-sport-vergeze" },
];

export default function SeoLocal() {
    return (
        <section
            id="salle-de-sport-nimes"
            aria-label="HALL B, salle de sport près de Nîmes"
            className="w-full bg-background-base px-content lg:px-contentLg pb-subSection"
        >
            <div className="w-full max-w-4xl mx-auto text-foreground-subdued">
                <h2 className="text-foreground-base text-center mb-subTitle">
                    Votre salle de sport entre Nîmes et la Vaunage
                </h2>

                <p className="mb-content">
                    HALL B est une <strong>salle de sport de 2 400 m²</strong> située à Saint-Dionisy, dans le
                    Gard, à seulement 15 minutes de Nîmes. Pensée pour tous les profils — du débutant au sportif
                    confirmé — elle réunit sous un même toit un grand{" "}
                    <Link href="/cours/musculation" className="text-accent hoverUnderline">plateau de musculation</Link>,
                    des <Link href="/cours" className="text-accent hoverUnderline">cours collectifs</Link>, des small
                    groups, un bassin d&apos;<Link href="/cours/aquagym" className="text-accent hoverUnderline">aquagym</Link>,
                    deux terrains de <Link href="/squash" className="text-accent hoverUnderline">squash</Link>, une école
                    de danse et un pôle santé avec ostéopathe.
                </p>

                <p className="mb-content">
                    Idéalement placée au cœur de la <span className="text-accent">Vaunage</span>, HALL B est facilement
                    accessible depuis Nîmes, Calvisson, Sommières, Vergèze, Caveirac, Langlade et Saint-Côme. Un grand
                    parking gratuit vous attend directement devant la salle, et le plateau de musculation est ouvert{" "}
                    <strong>7j/7 de 6h à 23h</strong> pour s&apos;adapter à tous les emplois du temps.
                </p>

                <p className="mb-content">
                    Que votre objectif soit la prise de masse, la perte de poids, la remise en forme ou simplement le
                    plaisir de bouger dans une ambiance conviviale, nos coachs diplômés vous accompagnent à chaque
                    étape. Découvrez nos{" "}
                    <Link href="/tarifs" className="text-accent hoverUnderline">formules d&apos;abonnement</Link> sans
                    engagement, consultez les <Link href="/plannings" className="text-accent hoverUnderline">plannings</Link>{" "}
                    et profitez d&apos;une{" "}
                    <Link href="/essai-offert" className="text-accent hoverUnderline">séance d&apos;essai offerte</Link>{" "}
                    pour découvrir la salle.
                </p>

                <nav
                    aria-label="Salle de sport par ville et temps de trajet"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-content"
                >
                    {DISTANCES.map((d) => (
                        <Link
                            key={d.slug}
                            href={`/${d.slug}`}
                            className="block bg-background-subdued rounded-xl p-3 text-center hover:bg-background-highlight transition-colors"
                        >
                            <p className="text-foreground-base font-semibold">{d.ville}</p>
                            <p className="textSmall text-accent">{d.temps}</p>
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    );
}
