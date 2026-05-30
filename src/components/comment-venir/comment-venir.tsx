import Link from "next/link";
import { MapPin, Clock, Phone, Car, Navigation, SquareParking } from "lucide-react";

import PageStructure from "@/components/ui/page-structure";
import Clickable from "@/components/ui/clickable";
import { COMMUNES } from "@/components/local/communes-data";

const PHONE_DISPLAY = "04 66 19 16 76";
const PHONE_TEL = "+33466191676";
const MAP_SRC =
    "https://maps.google.com/maps?q=1%20chemin%20Azord%2C%2030980%20Saint-Dionisy&z=14&hl=fr&output=embed";
const MAP_DIR =
    "https://www.google.com/maps/dir/?api=1&destination=1+chemin+Azord+30980+Saint-Dionisy";

const ROUTES: { ville: string; time: string; desc: string }[] = [
    { ville: "Depuis Nîmes", time: "≈ 15 min", desc: "Direction ouest / Vaunage par la D40 (Caveirac puis Saint-Dionisy)." },
    { ville: "Depuis Calvisson", time: "≈ 5 min", desc: "Salle voisine, située à l'entrée de Saint-Dionisy." },
    { ville: "Depuis Sommières", time: "≈ 15 min", desc: "Via Calvisson, puis direction Saint-Dionisy." },
    { ville: "Depuis Quissac", time: "≈ 20 min", desc: "Via Sommières, puis Saint-Dionisy." },
    { ville: "Depuis l'A9", time: "≈ 15 min", desc: "Sortie Gallargues / Vergèze, puis direction Vaunage." },
];

export default function CommentVenir() {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hallb.fr/" },
            { "@type": "ListItem", position: 2, name: "Comment venir", item: "https://www.hallb.fr/comment-venir" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <PageStructure
                title="Comment venir"
                subtitle={
                    <p>
                        HALL B se situe à Saint-Dionisy, au cœur de la Vaunage, à 15 minutes de Nîmes. Itinéraire,
                        horaires et parking gratuit — tout est ici.
                    </p>
                }
            >
                <div className="w-full max-w-4xl mx-auto text-foreground-subdued space-y-16">
                    {/* Coordonnées + carte */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-accent size-7 shrink-0" />
                                <div>
                                    <p className="text-foreground-base font-semibold">Adresse</p>
                                    <p>HALL B — 1 chemin Azord, 30980 Saint-Dionisy</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <SquareParking className="text-accent size-7 shrink-0" />
                                <div>
                                    <p className="text-foreground-base font-semibold">Parking</p>
                                    <p>Grand parking gratuit directement devant l&apos;entrée de la salle.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="text-accent size-7 shrink-0" />
                                <div>
                                    <p className="text-foreground-base font-semibold">Horaires d&apos;accès</p>
                                    <p>Plateau en accès libre 7j/7, de 6h à 23h.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-accent size-7 shrink-0" />
                                <div>
                                    <p className="text-foreground-base font-semibold">Téléphone</p>
                                    <a href={`tel:${PHONE_TEL}`} className="text-accent hoverUnderline">
                                        {PHONE_DISPLAY}
                                    </a>
                                </div>
                            </div>

                            <a
                                href={MAP_DIR}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="clickableBase hoverAccent text-background-subdued bg-accent rounded-full px-4 py-2 textLead flexCenter gap-2 mt-2 w-fit"
                            >
                                <Navigation className="size-5" />
                                Ouvrir l&apos;itinéraire
                            </a>
                        </div>

                        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-80 rounded-xl overflow-hidden">
                            <iframe
                                title="Localisation de HALL B à Saint-Dionisy"
                                src={MAP_SRC}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </section>

                    {/* En voiture */}
                    <section>
                        <h2 className="text-foreground-base mb-subTitle flex items-center gap-2">
                            <Car className="text-accent size-7 shrink-0" />
                            En voiture
                        </h2>
                        <ul className="list-none space-y-3">
                            {ROUTES.map((r) => (
                                <li
                                    key={r.ville}
                                    className="bg-background-highlight rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                                >
                                    <div>
                                        <p className="text-foreground-base font-semibold">{r.ville}</p>
                                        <p className="textSmall">{r.desc}</p>
                                    </div>
                                    <span className="text-accent font-semibold shrink-0">{r.time}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Pages par ville */}
                    <section className="text-center">
                        <h2 className="text-foreground-base mb-content">Vous venez d&apos;une ville voisine&nbsp;?</h2>
                        <p className="mb-content">
                            Retrouvez toutes les infos d&apos;accès et nos atouts pour votre commune&nbsp;:
                        </p>
                        <nav
                            aria-label="Pages salle de sport par ville"
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {COMMUNES.map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/${c.slug}`}
                                    className="bg-background-subdued rounded-full px-4 py-2 text-foreground-base hoverUnderline"
                                >
                                    {c.linkLabel}
                                </Link>
                            ))}
                        </nav>
                    </section>

                    {/* CTA */}
                    <section className="bg-background-highlight rounded-xl p-6 flex flex-col items-center text-center gap-4">
                        <p className="textLead text-foreground-base">
                            Première visite&nbsp;? Profitez d&apos;une séance d&apos;essai offerte.
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
