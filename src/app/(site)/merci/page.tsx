/** Page de remerciement après inscription : textes gérés dans Pages → Page Merci. */
import { Metadata } from "next";
import { draftMode } from "next/headers";

import Clickable from "@/components/ui/clickable";
import { getGlobal } from "@/lib/cms";

export const metadata: Metadata = {
    title: "HALL B - Merci",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default async function ThankYouPage() {
    const { isEnabled: draft } = await draftMode();
    const page = await getGlobal("page-merci", draft);

    return (
        <div className="w-full h-[100vh] bg-background-base flexCenter flex-col">
            <h1 className="text-foreground-base mb-2">{page?.titre || "Merci !"}</h1>
            <p className="text-foreground-subdued mb-4">
                {page?.texte ||
                    "Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l'application Sportigo."}
            </p>
            <Clickable
                clickableType={{ type: "link", path: page?.bouton?.url || "/" }}
                style={{ variant: "action", color: "primary" }}
                className=""
            >
                {page?.bouton?.texte || "Retour à l'accueil"}
            </Clickable>
        </div>
    );
}
