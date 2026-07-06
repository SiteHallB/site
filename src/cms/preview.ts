/**
 * Construction des URL d'aperçu en direct pour le back-office.
 * L'aperçu passe par /next/preview qui active le mode brouillon puis redirige.
 */
export function previewSecret(): string {
    return process.env.PREVIEW_SECRET || process.env.PAYLOAD_SECRET || "hallb-preview";
}

export function previewUrl(path: string): string {
    const base =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : "http://localhost:3000");
    return `${base}/next/preview?secret=${encodeURIComponent(previewSecret())}&path=${encodeURIComponent(path)}`;
}
