"use client";

import Clickable from "@/components/ui/clickable";
import { useLinks } from "@/context/link-context";
import {  Star as St } from "lucide-react";
import { useEffect, useState } from "react";

type Review = {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
    time: string;
};

function Star() {
    return (
        <St
            size={24}
            strokeWidth={2}
            className="text-background-highlight"
            fill="#E1C340"
        />
    );
}

function Avis({ text, autheur }: { text: string; autheur: string }) {
    return (
        <div className="w-full flex flex-col p-contentClose rounded outline-background-highlight outline-3">
            {/* Note */}
            <div className="flex flex-row mb-contentClose">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
            </div>
            {/* Citation */}
            <blockquote className="text-foreground-base textNormal">
                {text}
            </blockquote>
            <cite className="text-foreground-subdued textSmall">{autheur}, <em>avis Google</em></cite>
        </div>
    );
}

export default function GoogleReviews() {
    const { avis } = useLinks();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState<number | null>(null);
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/google-reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data.reviews || []);
                setRating(data.rating || null);
                setCount(data.user_ratings_total || null);
            });
    }, []);

    return (
        <div className="z-10 w-full flex flex-col items-center space-y-content">
            <h2 className="text-foreground-base text-center">Votre avis nous intéresse</h2>
            {rating && count && (
                <div className="mb-2">{rating} / 5 ({count} avis)</div>
            )}
            <Avis
                autheur="Eliot Collombet"
                text="Tout simplement la meilleure salle de sport que j'aie jamais vu. Encadrement, matériel, surface, ambiance, tout y est."/>
            <Avis
                autheur="Gauthier Bonhomme"
                text="J'ai visité la salle en juillet, la surface est juste dingue et le matériel est d'excellente qualité"/>
            <p className="text-foreground-subdued textSmall text-center">
                Les avis affichés proviennent de Google. 
                Seuls les plus récents ayant reçu une note de 4 étoiles ou plus sont présentés ici. 
                Tous les avis sont consultables sur Google.
            </p>
            {/* Bouton pour donner son avis */}
            <Clickable
                clickableType={{type: "link", path: avis, outside: true}}
                style={{"variant": "action", "color": "accent"}}
                className="lg:w-fit w-full"
            >
                Je donne mon avis
            </Clickable>
        </div>
    );
}