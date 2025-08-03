import { Metadata } from "next";

import Clickable from "@/components/ui/clickable";

export const metadata: Metadata = {
    title: "HALL B - Merci", 
    robots: {
        index: false,
        follow: false,
        nocache: true,
    }
}

export default function ThankYouPage() {
    return (
        <div className="w-full h-[100vh] bg-background-base flexCenter flex-col">
            <h1 className="text-foreground-base mb-2">Merci !</h1>
            <p className="text-foreground-subdued mb-4">Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l'application Sportigo.</p>
            <Clickable
                clickableType={{type: "link", path: "/"}}
                style={{variant: "action", color: "primary"}}
                className=""
            >
                Retour à l'accueil
            </Clickable>
        </div>
    );
}