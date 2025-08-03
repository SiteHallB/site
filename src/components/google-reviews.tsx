"use client";

import Clickable from "@/components/ui/clickable";
import { useLinks } from "@/context/link-context";
import {  Star as St, StarHalf as StH } from "lucide-react";
import { use, useEffect, useState } from "react";

type Review = {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
    time: string;
};

function Star({ half }: { half: boolean }) {
    if (half) {
        return (
            <StH
                size={24}
                strokeWidth={2}
                className="text-background-highlight"
                fill="#E1C340"
            />
        );
    } else {
        return (
            <St
                size={24}
                strokeWidth={2}
                className="text-background-highlight"
                fill="#E1C340"
            />
        );
    }
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex flex-row space-x-1 items-center">
            <p className="text-foreground-subdued textSmall">{rating} / 5</p>
            <div className="flex flex-row">
                {Array.from({ length: 5 }, (_, index) => {
                    if (rating - index <= 0) return null;
                    return <Star key={index} half={rating - index <= 0.5}/>
                })}
            </div>
        </div>
    )
}

function Avis(review: Review) {
    return (
        <div className="w-full flex flex-col p-contentClose rounded outline-background-highlight outline-3">
            {/* Note */}
            <StarRating rating={review.rating}/>

            {/* Citation */}
            <blockquote className="mt-contentClose text-foreground-base textNormal mb-1">
                {review.text}
            </blockquote>
            <cite className="text-foreground-subdued textSmall">{review.author_name}, {review.time}</cite>
        </div>
    );
}

export default function GoogleReviews() {
    const { avis } = useLinks();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState<number | null>(null);
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/google-reviews", { next: { revalidate: 3600 } })
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
                <div className="flex flex-row items-center mb-contentClose space-x-contentClose">
                    <p className="text-foreground-base"> {count} avis : </p>
                    <StarRating rating={rating}/>
                </div>
            )}
            {reviews.map((review, index) => (
                <Avis key={index} {...review} />
            ))}
            <p className="text-foreground-subdued textSmall text-center">
                {"Les avis affichés proviennent de Google et leur sélection est effectuée automatiquement par l'API Google. "}
                <span>
                    <Clickable
                        clickableType={{type: "link", path: avis, outside: true}}
                        style={{}}
                        className="hoverUnderline"
                    >
                        <>Tous les avis sont consultables sur <u>Google.</u></>
                    </Clickable>
                </span>
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