"use client"

import videoData from "@/interface/videos.json"
import { useEffect, useState, useRef } from "react";

export default function VideoBackground({ id }: { id: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const video = videoData.find(v => v.id === id);
    if (video === undefined) {
        console.log("Aucune vidéo de présentation")
        return;
    }

    return (
        <div className="min-w-full h-full overflow-hidden">
            <video src={video.path}
                poster="/images/concept.jpg"
                playsInline
                muted
                autoPlay
                loop
                className="size-full object-cover object-center"
            />
        </div>
    );
}