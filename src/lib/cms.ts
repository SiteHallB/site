/**
 * Couche d'accès aux données du CMS pour le site.
 * Toutes les lectures passent par l'API locale de Payload (accès direct à la base).
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";
import type { Config } from "@/payload-types";

type GlobalSlug = keyof Config["globals"];
type CollectionSlug = keyof Config["collections"];

export const getPayloadClient = cache(() => getPayload({ config }));

/** Lit un réglage global (avec ses relations résolues). */
export const getGlobal = cache(
    async <T extends GlobalSlug>(slug: T, draft = false): Promise<Config["globals"][T]> => {
        const payload = await getPayloadClient();
        return payload.findGlobal({ slug, draft, depth: 2 }) as Promise<Config["globals"][T]>;
    },
);

/** Liste les documents publiés d'une collection, triés. */
export const getCollection = cache(
    async <T extends CollectionSlug>(
        slug: T,
        options?: { draft?: boolean; sort?: string; limit?: number },
    ): Promise<Config["collections"][T][]> => {
        const payload = await getPayloadClient();
        const result = await payload.find({
            collection: slug,
            draft: options?.draft ?? false,
            depth: 2,
            limit: options?.limit ?? 200,
            pagination: false,
            sort: options?.sort ?? "ordre",
        });
        return result.docs as Config["collections"][T][];
    },
);

/** Trouve un document par slug (champ « slug »). */
export const getBySlug = cache(
    async <T extends CollectionSlug>(
        collection: T,
        slug: string,
        draft = false,
    ): Promise<Config["collections"][T] | null> => {
        const payload = await getPayloadClient();
        const result = await payload.find({
            collection,
            draft,
            depth: 2,
            limit: 1,
            where: { slug: { equals: slug } },
        });
        return (result.docs[0] as Config["collections"][T]) ?? null;
    },
);
