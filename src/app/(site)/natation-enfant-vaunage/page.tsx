/** Page Natation enfant : textes gérés dans Pages → Page Natation enfant. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import NatationVaunage, { type NatationData } from "@/components/natation-enfant-vaunage/natation-enfant-vaunage";
import { getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText } from "@/lib/richtext";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/bebe_nageur.webp", width: 3024, height: 4032, alt: "Flyer bébés nageurs HALL B" };

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-natation");
    return {
        title: page?.seo?.titre || "HALL B – Natation Enfant | Vaunage, Saint Dionisy, Nîmes",
        description:
            page?.seo?.description ||
            "Cours de natation enfant en Vaunage – Piscine intérieure à Saint Dionisy, près de Nîmes (Gard). Inscriptions ouvertes.",
        alternates: { canonical: `${SITE_URL}/natation-enfant-vaunage` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("page-natation", draft);

    const data: NatationData = {
        titre: page?.titre || "Natation",
        sousTitre: page?.sousTitre || "Cours de natation en vaunage - Piscine intérieure à Saint Dionisy.",
        intro: page?.intro || "Chez HALL B à Saint-Dionisy, nous proposons :",
        offres: (page?.offres ?? []).map((o) => ({
            icone: o.icone || "CheckCheck",
            texte: <RichText data={o.texte} />,
        })),
        bouton: {
            texte: page?.bouton?.texte || "Acheter en ligne",
            url: page?.bouton?.url || "/tarifs/carnet-seances",
        },
        horaires: {
            titre: page?.horaires?.titre || "Horaires : (tous les Mercredis)",
            lignes: (page?.horaires?.lignes ?? []).map((l) => l.texte),
        },
        image: img(page?.image, IMAGE_DEFAUT) as ImageType,
    };

    return <NatationVaunage data={data} />;
}
