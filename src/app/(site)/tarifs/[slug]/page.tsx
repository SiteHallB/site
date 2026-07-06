/**
 * Page de souscription d'une formule (/tarifs/…), générée depuis le CMS
 * (Contenu → Formules & tarifs). Les offres affichées proviennent de Sportigo.
 */
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import FilterIdsGroupPage, { type QueryFilter } from "@/components/tarifs/filter-ids-group-page";
import IdsGroupPage from "@/components/tarifs/ids-group-page";
import ContactWidgetBox from "@/components/tarifs/contact-widget-box";
import { getBySlug, getCollection } from "@/lib/cms";
import { RichText, richTextToPlainText } from "@/lib/richtext";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

type Args = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const formules = await getCollection("formules");
    return formules.filter((f) => f.pageDediee !== false).map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getBySlug("formules", slug);
    if (!doc) return {};

    const titre = doc.seo?.titre || `HALL B – Formule ${doc.titre} | Salle de sport Saint Dionisy`;
    const description = doc.seo?.description || richTextToPlainText(doc.sousTitrePage) || doc.sousTitre || "";

    return {
        title: titre,
        description,
        alternates: { canonical: `${SITE_URL}/tarifs/${doc.slug}` },
        robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
        openGraph: { title: titre, description, url: `${SITE_URL}/tarifs/${doc.slug}`, type: "website", siteName: "HALL B" },
    };
}

export default async function Page({ params }: Args) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();
    const doc = await getBySlug("formules", slug, draft);

    if (!doc || (doc.pageDediee === false && !draft)) notFound();

    const sousTitre = (
        <>
            <RichText data={doc.sousTitrePage} />
            {doc.afficherContact && <ContactWidgetBox />}
        </>
    );

    /* Page sans filtres : liste d'offres directe (ex : Danse, Carnet de séances). */
    if (!doc.filtres || doc.filtres.length === 0) {
        return (
            <IdsGroupPage
                title={doc.titre}
                subtitle={sousTitre}
                ids={doc.offresSimples ?? []}
            />
        );
    }

    /* Filtres exclusifs : groupes → options → identifiants d'offres Sportigo. */
    const filters = doc.filtres.map((groupe) => ({
        noneFilterName: groupe.titreAucun,
        filters: (groupe.options ?? []).map((option) => ({
            filterName: option.nom,
            ids: new Set(option.ids ?? []),
        })),
    }));

    /* Pré-sélection d'un filtre via ?option=… (ex : /tarifs/aqua?option=cours-co). */
    const queryEntries: [string, string][] = [];
    doc.filtres.forEach((groupe, i) => {
        (groupe.options ?? []).forEach((option, j) => {
            if (option.optionUrl) queryEntries.push([JSON.stringify([i, j]), option.optionUrl]);
        });
    });
    const queryFilter: QueryFilter | undefined = queryEntries.length > 0 ? new Map(queryEntries) : undefined;

    return (
        <FilterIdsGroupPage
            title={doc.titre}
            subtitle={sousTitre}
            filters={filters}
            queryFilter={queryFilter}
        />
    );
}
