"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import clsx from "clsx";

export default function VideoBackground({
  className,
  videoUrl,
  poster,
}: {
  className?: string;
  videoUrl: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    // Obligatoire pour certains navigateurs (Chrome mobile, etc.)
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.loop = true;

    const playVideo = () => {
      // Appel .play() mais on gère la promesse silencieusement
      video
        .play()
        .catch(() => {
          // Autoplay est bloqué : on masque les controls !
          video.controls = false;
        });
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", playVideo);
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
    }

    // Toujours masquer les controls
    video.controls = false;

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
      if (hls) hls.destroy();
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 overflow-hidden flexCenter">
      <video
        ref={videoRef}
        className={clsx(
          className,
          "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        )}
        poster={poster}
        aria-hidden="true"
        // Ne PAS mettre autoPlay/muted/loop ici car on les force dans le useEffect
      />
    </div>
  );
}
