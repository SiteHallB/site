"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import clsx from "clsx";

interface VideoBackgroundProps {
  className?: string;
  videoUrl: string; // ton .m3u8 Bunny Stream
  poster: string;
}

export default function VideoBackground({
  className,
  videoUrl,
  poster,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // Forcer la qualité max au MANIFEST_PARSED
      const setMaxQualityAndPlay = () => {
        if (hls && hls.levels.length > 0) {
          hls.currentLevel = hls.levels.length - 1; // max
        }
        video.play().catch(() => {});
      };
      hls.on(Hls.Events.MANIFEST_PARSED, setMaxQualityAndPlay);

      // Boucle custom (évite la destruction HLS)
      const onEnded = () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      };
      video.addEventListener("ended", onEnded);

      // Toujours cacher controls JS côté client
      video.controls = false;

      // Clean-up
      return () => {
        hls?.off(Hls.Events.MANIFEST_PARSED, setMaxQualityAndPlay);
        video.removeEventListener("ended", onEnded);
        hls?.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari natif
      video.src = videoUrl;
      const onEnded = () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      };
      video.addEventListener("ended", onEnded);
      video.controls = false;
      return () => {
        video.removeEventListener("ended", onEnded);
      };
    }
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 overflow-hidden flexCenter">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        // PAS de loop, gérée en JS
        controls={false}
        className={clsx(
          className,
          "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        )}
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        preload="auto"
      />
      <style>{`
        video::-webkit-media-controls,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-start-playback-button {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        video {
          pointer-events: none !important;
          user-select: none !important;
        }
      `}</style>
    </div>
  );
}
