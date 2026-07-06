import Link from "next/link";

export type SeoLocalData = {
    titre: string;
    contenu: React.ReactNode;
    distances: { ville: string; temps: string; slug: string }[];
};

export default function SeoLocal({ data }: { data: SeoLocalData }) {
    return (
        <section
            id="salle-de-sport-nimes"
            aria-label="HALL B, salle de sport près de Nîmes"
            className="w-full bg-background-base px-content lg:px-contentLg pb-subSection"
        >
            <div className="w-full max-w-4xl mx-auto text-foreground-subdued">
                <h2 className="text-foreground-base text-center mb-subTitle">
                    {data.titre}
                </h2>

                <div className="[&_p]:mb-content">{data.contenu}</div>

                <nav
                    aria-label="Salle de sport par ville et temps de trajet"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-content"
                >
                    {data.distances.map((d) => (
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
