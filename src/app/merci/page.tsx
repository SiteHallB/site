import Clickable from "@/components/ui/clickable";

export default function ThankYouPage() {
    return (
        <div className="w-full h-[100vh] bg-background-base flexCenter flex-col">
            <h1 className="text-foreground-base mb-2">Merci !</h1>
            <p className="text-foreground-subdued mb-4">Vous vous êtes inscrit avec succès, à très vite</p>
            <Clickable
                clickableType={{type: "link", path: "/"}}
                style={{variant: "action", color: "primarySubdued"}}
                className=""
            >
                Retour à l'accueil
            </Clickable>
        </div>
    );
}