"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import clsx from "clsx";

type Props = {
    src: string;
    poster?: string;
    className: string;
};

export default function BackgroundVideo({
    src,
    poster,
    className, 
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Important pour iOS/Safari : définir ces flags avant toute source
        video.muted = true;
        video.playsInline = true as any; // TS compat
        (video as any).webkitPlaysInline = true;

        let hls: Hls | null = null;

        async function setup() {
            if (!video) return;
            try {
                if (video.canPlayType("application/vnd.apple.mpegURL")) {
                    video.src = src; // Safari (iOS/macOS) lit HLS nativement
                } else if (Hls.isSupported()) {
                    hls = new Hls({ autoStartLoad: true });
                    hls.loadSource(src);
                    hls.attachMedia(video);
                } else {
                    // Pas de support HLS → fallback
                    setFailed(true);
                    return;
                }

                // Essaye l’autoplay muet
                const playPromise = video.play();
                if (playPromise && "catch" in playPromise) {
                await (playPromise as Promise<void>);
                }
            } catch {
                // Autoplay refusé (Low Power Mode / Data Saver / politique stricte)
                setFailed(true);
            }
        }

        setup();

        return () => {
            if (hls) {
                hls.destroy();
                hls = null;
            }
        };
    }, [src]);

    if (failed) {
        // Fallback “propre” sans contrôles (image fixe ou webp animé en loop)
        return (
        <div className={clsx(className, "absolute inset-0")}>
            <img
            src={poster}
            alt=""
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
            />
        </div>
        );
    }

    return (
        <video
            ref={videoRef}
            // Accessibilité : décoratif pur → aria-hidden
            aria-hidden="true"
            className={clsx(className, "absolute inset-0 w-full h-full object-cover")}
            autoPlay
            muted
            playsInline
            loop={true}
            // Empêche l’accès aux contrôles/menus contextuels au max possible
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            disablePictureInPicture
            preload="auto"
            poster={poster}
            onPlay={() => {
                // Si tu veux faire qqch quand ça marche (ex: cacher un loader)
            }}
            onError={() => setFailed(true)}
        />
    );
}
