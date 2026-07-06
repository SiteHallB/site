/**
 * Conversion des documents « media » du CMS vers le format d'image du site.
 */
import type { Media } from "@/payload-types";
import type { ImageType } from "@/context/image-context";

/**
 * Les fichiers servis par Payload (/api/media/file/…) ont une URL absolue :
 * on la rend relative pour next/image (même origine). Les URLs vraiment
 * externes (CDN, Vercel Blob en accès direct) restent absolues.
 */
function urlAffichable(url: string): string {
    if (!url.startsWith("http")) return url;
    try {
        const u = new URL(url);
        if (u.pathname.startsWith("/api/media/")) return u.pathname + u.search;
        return url;
    } catch {
        return url;
    }
}

/** Convertit un média du CMS en ImageType (src / width / height / alt). */
export function img(media: Media | number | null | undefined, fallback?: ImageType): ImageType | undefined {
    if (!media || typeof media === "number" || !media.url) return fallback;
    return {
        src: urlAffichable(media.url),
        width: media.width ?? undefined,
        height: media.height ?? undefined,
        alt: media.alt ?? "",
    };
}

/** Comme img() mais avec une image de secours obligatoire (jamais undefined). */
export function imgOr(media: Media | number | null | undefined, fallback: ImageType): ImageType {
    return img(media) ?? fallback;
}

/** URL absolue d'un média (Open Graph, données structurées). */
export function mediaUrl(media: Media | number | null | undefined, base: string): string | undefined {
    if (!media || typeof media === "number" || !media.url) return undefined;
    if (media.url.startsWith("http")) return media.url;
    return `${base}${media.url}`;
}
