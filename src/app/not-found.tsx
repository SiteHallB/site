import Clickable from '@/components/ui/clickable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page non trouvée',
};

export default function NotFound() {
    return (
        <div className="w-full h-[100vh] bg-background-base flexCenter flex-col">
            <h1 className="text-foreground-base mb-2">Oups !</h1>
            <p className="text-foreground-subdued mb-4">Vous semblez perdu. Cette page n'existe pas.</p>
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
