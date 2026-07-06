/**
 * Page Tarifs : textes gérés dans Pages → Page Tarifs,
 * cartes générées depuis Contenu → Formules & tarifs.
 */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import Tarifs, { type CarteFormule, type TarifsData } from "@/components/tarifs/tarifs";
import { getCollection, getGlobal } from "@/lib/cms";
import { img } from "@/lib/media";
import { RichText } from "@/lib/richtext";
import type { Formule } from "@/payload-types";
import type { ImageType } from "@/context/image-context";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";
const IMAGE_DEFAUT: ImageType = { src: "/images/vue_plateau_2.webp", width: 3024, height: 4032, alt: "Plateau de musculation HALL B" };

export async function generateMetadata(): Promise<Metadata> {
    const page = await getGlobal("page-tarifs");
    const titre = page?.seo?.titre || "HALL B – Tarifs | Salle de sport Saint Dionisy, Nîmes, Gard";
    const description =
        page?.seo?.description ||
        "Découvrez les formules d'abonnement de HALL B, salle de sport à Saint Dionisy près de Nîmes (Gard) : Classic, Boost, Aqua, Danse.";
    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/tarifs` },
        robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/tarifs`, type: "website", siteName: "HALL B" },
    };
}

function carte(formule: Formule): CarteFormule {
    const prix = formule.prix;
    return {
        titre: formule.titre,
        sousTitre: formule.sousTitre || "",
        prix:
            prix?.montant ? (
                <p className="textSmall">
                    {prix.prefixe ? `${prix.prefixe} ` : ""}
                    <span className="textSubH2">{prix.montant}</span>
                    {prix.suffixe || ""}
                </p>
            ) : prix?.prefixe ? (
                <p>{prix.prefixe}</p>
            ) : null,
        images: (formule.images ?? [])
            .map((i) => img(i.image))
            .filter((i): i is ImageType => Boolean(i)),
        checks: (formule.avantages ?? [])
            .filter((a) => a.icone !== "plus")
            .map((a, i) => <RichText key={i} data={a.texte} />),
        plus: (formule.avantages ?? [])
            .filter((a) => a.icone === "plus")
            .map((a, i) => <RichText key={i} data={a.texte} />),
        actionLink: formule.lienCarte || `/tarifs/${formule.slug}`,
    };
}

export default async function Page() {
    const { isEnabled: draft } = await draftMode();
    const [page, formules] = await Promise.all([
        getGlobal("page-tarifs", draft),
        getCollection("formules", { draft }),
    ]);

    const principales = formules.filter((f) => f.groupe === "principale").map(carte);
    const autres = formules.filter((f) => f.groupe === "autre").map(carte);
    const cadeauDoc = formules.find((f) => f.groupe === "cadeau");
    const cadeau = cadeauDoc ? carte(cadeauDoc) : undefined;

    /* Sans contenu CMS, les cartes affichent au moins une image par défaut. */
    for (const c of [...principales, ...autres, ...(cadeau ? [cadeau] : [])]) {
        if (c.images.length === 0) c.images = [IMAGE_DEFAUT];
    }

    const data: TarifsData = {
        titre: page?.titre || "Tarifs",
        sousTitre: (
            <p>
                {page?.sousTitre ||
                    "Choisissez l'offre adaptée à vos besoins. Nos formules Classic, Boost, et Aqua sont disponibles en paiement sans engagement, mensuel, ou annuel."}
            </p>
        ),
        lienSquash: { texte: page?.lienSquashTexte || "Voir tarifs Squash", url: "/squash" },
        principales,
        autres,
        cadeau,
        texteSeo: {
            titre: page?.texteSeo?.titre || "",
            contenu: <RichText data={page?.texteSeo?.contenu} />,
        },
    };

    return <Tarifs data={data} />;
}
