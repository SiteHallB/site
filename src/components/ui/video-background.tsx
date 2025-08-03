"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import clsx from "clsx";

export default function VideoBackground({ className, videoUrl, poster }: { className?: string; videoUrl: string, poster: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Code exécuté côté client uniquement
        if (!videoRef.current) return;

        // Sinon, Hls.js s'en charge
        else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play();
            });
            return () => hls.destroy();
        }
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden flexCenter">
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={clsx(className, "absolute inset-0 w-full h-full object-cover pointer-events-none select-none")}
            poster={poster}
            aria-hidden="true"
        />
        </div>
    );
}