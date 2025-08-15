"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import clsx from "clsx";

type Props = {
  src: string;
  poster?: string;
  className: string;
  simulateSlowMs?: number; // optionnel pour tests
};

export default function BackgroundVideo({
  src,
  poster,
  className,
  simulateSlowMs = 0,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [showPoster, setShowPoster] = useState(true); // 👈 overlay visible tant que pas prêt

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS/Safari: ces flags AVANT toute source
    video.muted = true;
    (video as any).playsInline = true;
    (video as any).webkitPlaysInline = true;

    let hls: Hls | null = null;
    let delayTimer: any;

    const onLoadedData = () => setShowPoster(false);
    const onPlaying = () => setShowPoster(false);

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("playing", onPlaying);

    async function safePlay() {
        if(!video) return;
      try {
        await video.play();
      } catch {
        // autoplay refusé → on laisse l’overlay et on ne crash pas
      }
    }

    async function setup() {
    if(!video) return;
      try {
        // SAFARI (HLS natif)
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          const start = () => {
            video.src = src;        // n’assigne la src qu’au dernier moment
            video.load();
            // attendre que le média puisse jouer avant d’appeler play
            video.addEventListener(
              "canplay",
              () => safePlay(),
              { once: true }
            );
          };
          if (simulateSlowMs > 0) delayTimer = setTimeout(start, simulateSlowMs);
          else start();
          return;
        }

        // hls.js
        if (Hls.isSupported()) {
          hls = new Hls({ autoStartLoad: false, lowLatencyMode: false });
          hls.attachMedia(video);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls!.loadSource(src);
          });
          // une fois le manifest parsé, on démarre réellement le chargement
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const start = () => {
              hls?.startLoad();
              // attend "canplay" pour déclencher play → évite écran noir
              video.addEventListener(
                "canplay",
                () => safePlay(),
                { once: true }
              );
            };
            if (simulateSlowMs > 0) delayTimer = setTimeout(start, simulateSlowMs);
            else start();
          });
          hls.on(Hls.Events.ERROR, () => setFailed(true));
          return;
        }

        // Pas de support HLS
        setFailed(true);
      } catch {
        setFailed(true);
      }
    }

    setup();

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("playing", onPlaying);
      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, [src, simulateSlowMs]);

  if (failed) {
    // Fallback image simple
    return (
      <div className={clsx(className, "absolute inset-0")}>
        {poster && (
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        )}
      </div>
    );
  }

  return (
    <div className={clsx(className, "absolute inset-0")}>
      {/* Overlay poster fiable (indépendant de <video poster>), z-index au-dessus */}
      {showPoster && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-10"
          draggable={false}
        />
      )}

      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        disablePictureInPicture
        preload="auto"   // tu peux tester "metadata" ou "none" si besoin
        // poster={poster} // optionnel : on s'appuie sur l’overlay surtout
        onError={() => setFailed(true)}
      />
    </div>
  );
}
