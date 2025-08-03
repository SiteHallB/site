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

    // Ne pas forcer ici, déjà sur la balise HTML

    const playVideo = () => {
      video.play().catch(() => {
        video.controls = false;
      });
    };

    // Safari natif
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("canplay", playVideo, { once: true });
    }
    // Hls.js
    else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      video.addEventListener("canplay", playVideo, { once: true });
    }

    video.controls = false;

    return () => {
      video.removeEventListener("canplay", playVideo);
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
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
