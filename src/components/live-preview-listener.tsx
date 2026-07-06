"use client";

/**
 * En mode aperçu : rafraîchit la page à chaque modification dans le back-office
 * (aperçu en direct, sans rechargement complet).
 */
import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export default function LivePreviewListener() {
    const router = useRouter();
    const serverURL =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");

    return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}
