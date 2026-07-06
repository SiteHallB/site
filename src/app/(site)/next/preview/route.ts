/**
 * Active le mode brouillon (aperçu avant publication) puis redirige vers la page demandée.
 * Utilisé par l'aperçu en direct du back-office.
 */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { previewSecret } from "@/cms/preview";

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";
    const secret = searchParams.get("secret");

    if (secret !== previewSecret()) {
        return new Response("Aperçu non autorisé.", { status: 403 });
    }

    if (!path.startsWith("/")) {
        return new Response("Chemin invalide.", { status: 400 });
    }

    const draft = await draftMode();
    draft.enable();

    redirect(path);
}
