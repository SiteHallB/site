/**
 * Sitemap généré automatiquement depuis le CMS :
 * les pages créées/supprimées dans le back-office y apparaissent sans toucher au code.
 */
import type { MetadataRoute } from "next";
import { getCollection } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.hallb.fr";

const PAGES_FIXES = [
    "",
    "/tarifs",
    "/carte-cadeau",
    "/essai-offert",
    "/plannings",
    "/cours",
    "/contact",
    "/comment-venir",
    "/faq",
    "/squash",
    "/natation-enfant-vaunage",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [cours, formules, locales, libres] = await Promise.all([
        getCollection("cours"),
        getCollection("formules"),
        getCollection("villes"),
        getCollection("pages", { sort: "titre" }),
    ]);

    const now = new Date();

    return [
        ...PAGES_FIXES.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now })),
        ...cours
            .filter((c) => c.pageActive !== false)
            .map((c) => ({ url: `${SITE_URL}/cours/${c.slug}`, lastModified: new Date(c.updatedAt) })),
        ...formules
            .filter((f) => f.pageDediee !== false)
            .map((f) => ({ url: `${SITE_URL}/tarifs/${f.slug}`, lastModified: new Date(f.updatedAt) })),
        ...locales.map((p) => ({ url: `${SITE_URL}/${p.slug}`, lastModified: new Date(p.updatedAt) })),
        ...libres
            .filter((p) => !p.seo?.noIndex)
            .map((p) => ({ url: `${SITE_URL}/${p.slug}`, lastModified: new Date(p.updatedAt) })),
    ];
}
