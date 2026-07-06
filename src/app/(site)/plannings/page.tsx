/** Page Plannings : images et descriptions gérées dans Pages → Page Plannings. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import Plannings, { type PlanningsData } from "@/components/plannings/plannings";
import { getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("plannings-page");
    return {
        title: page?.seo?.titre || "HALL B – Plannings | Salle de sport Saint Dionisy, Nîmes",
        description:
            page?.seo?.description ||
            "Consultez le planning des cours collectifs et activités de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard).",
        alternates: { canonical: `${SITE_URL}/plannings` },
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("plannings-page", draft);

    const data: PlanningsData = {
        titre: page?.titre || "Plannings",
        sousTitre: page?.sousTitre || "Consultez nos nombreuses activités",
        sections: (page?.sections ?? []).map((section) => ({
            titre: section.titre,
            imageBureau: img(section.imageBureau),
            jours: (section.jours ?? [])
                .map((j) => img(j.image))
                .filter((i): i is ImageType => Boolean(i)),
        })),
        activites: (page?.activites ?? []).map((a) => ({
            titre: a.titre,
            illustration: img(a.illustration)?.src || "/images/plannings/weight.svg",
            url: a.url || "/tarifs/boost",
            description: a.description,
        })),
    };

    return <Plannings data={data} />;
}
